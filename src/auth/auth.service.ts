import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Model, isValidObjectId } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt.payload';
import { NORMAL_USER } from '../common/const/const';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createAuthDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      return await newUser.save();
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(`Data is ready exist`);
      else
        throw new InternalServerErrorException(
          `Can't create field - Check logs`,
        );
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { password, ...userData } = registerUserDto;

      delete userData.confirmPassword;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
        roles: [NORMAL_USER],
      });

      const user = await newUser.save();
      const token = await this.getJWT({ id: user._id });
      return {
        user: {
          ...user.toJSON(),
          password: undefined,
        },
        token,
      };
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(`Data is ready exist`);
      else
        throw new InternalServerErrorException(
          `Can't create field - Check logs`,
        );
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email, isActive: true });
    if (!user) throw new UnauthorizedException('Not valid credentials');
    if (!bcryptjs.compareSync(password, user.password))
      throw new UnauthorizedException('Not valid credentials');

    const token = await this.getJWT({ id: user._id });

    return {
      user: {
        ...user.toJSON(),
        password: undefined,
      },
      token,
    };
  }

  async findAllAdmin() {
    return await this.userModel.find({ roles: 'control' });
  }
  async findAllNormal() {
    return await this.userModel.find({ roles: 'normal' });
  }

  async findById(id: string) {
    const user = (await this.userModel.findById(id)).toJSON();
    if (!user) this.notFoundData();

    return {
      ...user,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) this.notFoundData();
    return user;
  }

  async update(id: string, updateAuthDto: UpdateUserDto): Promise<User> {
    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException(`Invalid user ID`);
      }

      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Check if the new password is provided
      if (
        'newPassword' in updateAuthDto &&
        'confirmPassword' in updateAuthDto
      ) {
        // Check if the current password provided matches the password stored in the database
        if (user.roles.includes(NORMAL_USER)) {
          if (
            updateAuthDto?.password &&
            !bcryptjs.compareSync(updateAuthDto.password, user.password)
          ) {
            throw new UnauthorizedException('Current password is incorrect');
          }
        }

        // Hashing of the new password and updating the field in the update object
        const newPasswordHash = (updateAuthDto.newPassword = bcryptjs.hashSync(
          updateAuthDto.newPassword,
          10,
        ));

        // Delete temporary fields that should not be saved in the database
        updateAuthDto.password = newPasswordHash;
        delete updateAuthDto?.confirmPassword;
        delete updateAuthDto?.newPassword;
        delete updateAuthDto?.email;
        if (user.roles.includes(NORMAL_USER)) {
          delete updateAuthDto.email;
          delete updateAuthDto.roles;
          delete updateAuthDto.isActive;
        }
      }

      // Update user in database
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { $set: updateAuthDto },
        { new: true },
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return updatedUser;
    } catch (error) {
      if (error.status == 401) throw new UnauthorizedException('unauthorized ');
      if (error.status == 400)
        throw new BadRequestException(`${error.message}`);
      throw new InternalServerErrorException(`Can't update user - Check logs`);
    }
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    try {
      const result = await this.userModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { deleted: true, id };
    } catch (error) {
      throw new InternalServerErrorException(`Can't remove user - Check logs`);
    }
  }

  notFoundData() {
    throw new NotFoundException(`data not fount`);
  }

  async getJWT(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }

  async checkToken(user: any) {
    const plainUserObject = user.toJSON ? user.toJSON() : user;
    const payload = {
      id: plainUserObject._id,
    };

    const token = await this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }
}
