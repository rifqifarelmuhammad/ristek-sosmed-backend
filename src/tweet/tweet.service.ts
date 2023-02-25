import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Tweet } from '../entities/tweet.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class TweetService {
    constructor(private prisma: PrismaService){}

    async getTweet(email: string){
        const allTweet = await this.prisma.tweet.findMany({orderBy: [{createdAt: 'desc'}], include: {author: true}})
        let output = [];

        for (let i = 0; i < allTweet.length; i++){
            const avatar = await this.prisma.avatar.findUnique({where: {email: allTweet[i].authorEmail}})
            let temp = {}

            if (allTweet[i].closeFriend){
                const user = await this.prisma.user.findUnique({where: {email: email}});

                if (allTweet[i].author.closeFriend.includes(user.username) || allTweet[i].authorEmail == email){

                    if (avatar == null){
                        temp = {
                            'id': allTweet[i].id,
                            'tweets': allTweet[i].tweets,
                            'email': allTweet[i].authorEmail,
                            'createAt': allTweet[i].createdAt,
                            'username': allTweet[i].author.username,
                            'closeFriend': allTweet[i].closeFriend
                        };
                    }else{
                        temp = {
                            'id': allTweet[i].id,
                            'tweets': allTweet[i].tweets,
                            'email': allTweet[i].authorEmail,
                            'createAt': allTweet[i].createdAt,
                            'username': allTweet[i].author.username,
                            'avatarUrl': avatar.urlAvatar,
                            'closeFriend': allTweet[i].closeFriend
                        };
                    }

                    output.push(temp)
                }
            }else{
                if (avatar == null){
                    temp = {
                        'id': allTweet[i].id,
                        'tweets': allTweet[i].tweets,
                        'email': allTweet[i].authorEmail,
                        'createAt': allTweet[i].createdAt,
                        'username': allTweet[i].author.username,
                        'closeFriend': allTweet[i].closeFriend
                    };
                }else{
                    temp = {
                        'id': allTweet[i].id,
                        'tweets': allTweet[i].tweets,
                        'email': allTweet[i].authorEmail,
                        'createAt': allTweet[i].createdAt,
                        'username': allTweet[i].author.username,
                        'avatarUrl': avatar.urlAvatar,
                        'closeFriend': allTweet[i].closeFriend
                    };
                }

                output.push(temp)
            }
        }

        return output
    }

    async getTweetProfile(email: string){
        // return (await this.prisma.user.findUnique({where: {email: email}, include: {tweet: true}})).tweet
        const tempTweet = (await this.prisma.user.findUnique({where: {email: email}, include: {tweet: true}})).tweet
        return tempTweet.reverse();
    }

    async postTweet(email: string, tweet: string, cf: boolean){
        const date: Date = new Date()
        date.setHours(date.getHours() + 7)
        return this.prisma.tweet.create({
            data:{
                tweets: tweet,
                authorEmail: email,
                closeFriend: cf,
                createdAt: date
            }
        })
    }

    async deleteTweet(id: number){
        return this.prisma.tweet.delete({where: {id: id}})
    }

    async updateTweet(id: number, tweets: string): Promise<Tweet>{
        const date: Date = new Date()
        date.setHours(date.getHours() + 7)
        return this.prisma.tweet.update({where: {id: id}, data:{tweets: tweets, createdAt:date}})
    }
}
