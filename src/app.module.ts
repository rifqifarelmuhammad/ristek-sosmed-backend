import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AvatarModule } from './avatar/avatar.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [UsersModule, PrismaModule, AvatarModule, CloudinaryModule, TweetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
