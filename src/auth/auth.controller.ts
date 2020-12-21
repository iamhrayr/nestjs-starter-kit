import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignInDto } from './dto/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signin')
  signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<{ user: IUser; token: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('/signup')
  signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyProfile(@Request() req): Promise<IUser> {
    return this.usersService.findOne(req.user._id);
  }
}
