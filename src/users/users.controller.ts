import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { Role } from './enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }
}
