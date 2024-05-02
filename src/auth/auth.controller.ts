import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import {
  AdminGuard,
  AuthGuard,
  EmailDomainGuard,
  UserIdMatchGuard,
} from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(EmailDomainGuard)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard, EmailDomainGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // Normals users
  @Get('normal')
  @UseGuards(AuthGuard, AdminGuard)
  findAdminAll() {
    return this.authService.findAllNormal();
  }

  // Only admin
  @Get('all')
  @UseGuards(AuthGuard, AdminGuard)
  findNormalAll() {
    return this.authService.findAllAdmin();
  }

  @Get('check-token')
  @UseGuards(AuthGuard)
  async checkToken(@Request() req: Request) {
    const user = req['user'];
    return this.authService.checkToken(user);
  }

  @Get('normal/:id')
  @UseGuards(AuthGuard, UserIdMatchGuard)
  findOneByNormal(@Param('id') id: string) {
    return this.authService.findById(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminGuard)
  findOneByAdmin(@Param('id') id: string) {
    return this.authService.findById(id);
  }

  @Patch('normal/:id')
  @UseGuards(AuthGuard, UserIdMatchGuard, EmailDomainGuard)
  updateNormal(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard, EmailDomainGuard)
  updateAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
