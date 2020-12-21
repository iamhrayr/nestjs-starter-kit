import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src//users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/users/enums/role.enum';

import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    await this.usersService.create(createUserDto, [Role.User]);
    return true;
  }

  async signIn({
    email,
    password,
  }: SignInDto): Promise<{ user: IUser; token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.generateToken(user);
      return { user, token };
    }
    throw new BadRequestException('Invalid credentials');
  }

  private generateToken(user: IUser): string {
    const tokenPayload = {
      _id: user._id,
      roles: user.roles,
    };
    return this.jwtService.sign(tokenPayload);
  }
}
