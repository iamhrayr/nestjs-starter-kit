import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto, roles: string[]): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
      roles,
    });
    return await createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
