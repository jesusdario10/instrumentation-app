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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
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

  async findAll() {
    return await this.userModel.find();
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

      // Inicializar un objeto para almacenar los campos válidos que se actualizarán
      const validUpdateFields: any = {};

      // Copiar los campos permitidos de updateAuthDto a validUpdateFields si existen en el esquema
      Object.keys(updateAuthDto).forEach((key) => {
        if (key in user.schema.paths) {
          validUpdateFields[key] = updateAuthDto[key];
        }
      });

      if (
        'password' in updateAuthDto &&
        'newPassword' in updateAuthDto &&
        'confirmPassword' in updateAuthDto
      ) {
        if (!bcryptjs.compareSync(updateAuthDto.password, user.password)) {
          throw new UnauthorizedException('Incorrect previous password');
        }

        if (updateAuthDto.newPassword !== updateAuthDto.confirmPassword) {
          throw new BadRequestException(
            'New password and confirmation do not match',
          );
        }

        validUpdateFields.password = bcryptjs.hashSync(
          updateAuthDto.newPassword,
          10,
        );

        // Eliminar campos temporales que no deben guardarse en la base de datos
        delete updateAuthDto.newPassword;
        delete updateAuthDto.confirmPassword;
      }

      // Actualizar el usuario en la base de datos
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { $set: validUpdateFields },
        { new: true },
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return updatedUser;
    } catch (error) {
      if (error.status == 401)
        throw new UnauthorizedException('Incorrect previous password');
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
