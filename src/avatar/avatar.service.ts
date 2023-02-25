import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Avatar } from "../entities/avatar.entity"

@Injectable()
export class AvatarService {
    constructor(private prisma: PrismaService){}

    async getAvatarByEmail(email: string){
        return this.prisma.avatar.findUnique({where: {email: email}})
    }

    async postAvatar(data: Prisma.avatarCreateInput): Promise<Avatar>{
        return this.prisma.avatar.create({data})
    }

    async deleteAvatar(email: string){
        return this.prisma.avatar.delete({where: {email: email}})
    }

    async updateAvatar(email: string, data: Prisma.avatarUpdateInput): Promise<Avatar>{
        return this.prisma.avatar.update({where: {email: email}, data})
    }
}
