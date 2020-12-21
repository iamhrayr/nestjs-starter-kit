import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configure.root';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
