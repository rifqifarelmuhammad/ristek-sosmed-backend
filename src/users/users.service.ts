import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async getAllUser(){
    return this.prisma.user.findMany()
  }

  async getUserByEmail(email: string){
    return await this.prisma.user.findUnique({where: {email: email}});
  }
  
  async getUserByUsername(email: string, username: string){
    let output = []

    const user = await this.prisma.user.findUnique({
      where: {email: email}
    })

    const otherUser = await this.prisma.user.findMany({
      where: {
        email: {
          contains: username
        }
      }
    })

    for (let i = 0; i < otherUser.length; i++){
      if (otherUser[i].email != email && !user.friend.includes(otherUser[i].username)){
        output.push({'username': otherUser[i].username})
      }
    }

    return output;
  }

  async updateBioUser(email: string, bio:string){
    return this.prisma.user.update({where: {email: email}, data: {bio: bio}})
  }

  async createUser(data: Prisma.userCreateInput){
    if ((await this.prisma.user.findUnique({where: {username: data.username}})) == null){
      await this.prisma.user.create({data})
      return {'status': 'ok'}
    }else{
      return {'status': 'error'}
    }
  }

  async getAllFriend(email: string){
    return (await this.prisma.user.findUnique({where: {email: email}})).friend;
  }

  async addFriend(email: string, usernameFriend: string){
    const friend = await this.prisma.user.findUnique({where: {username: usernameFriend}})

    if (friend == null){
      return {'status': 'failed', 'message': 'account doesnt exists'}
    }else{
      const user = await this.getUserByEmail(email)

      if (user.friend.includes(usernameFriend)){
        return {'status': 'failed', 'message': 'friend already add'}
      }else{
        user.friend.push(usernameFriend)
        await this.prisma.user.update({
          where: {email: email}, data: {friend: user.friend}
        })

        return {'status': 'succsess'}
      }
    }
  }

  async getAllCloseFriend(email: string){
    // if 
    return (await this.prisma.user.findUnique({where: {email: email}})).closeFriend;
  }

  async addCloseFriend(email: string, usernameCF: Array<string>){
    return this.prisma.user.update({
      where: {email: email}, data: {closeFriend: usernameCF}
    })
  }
}
