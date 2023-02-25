import { Controller, Get, Post, Param, Request, Delete, Patch, Req } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get(':email')
  getTweet(@Param('email') email: string){
    return this.tweetService.getTweet(email)
  }

  @Get('profile/:email')
  getTweetProfile(@Param('email') email: string){
    return this.tweetService.getTweetProfile(email)
  }

  @Post()
  postTweet(@Request() req){
    return this.tweetService.postTweet(req.body['email'], req.body['tweet'], req.body['cf'])
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: string){
    return this.tweetService.deleteTweet(+id)
  }

  @Patch(':id')
  editTweet(@Param('id') id: string, @Request() req){
    return this.tweetService.updateTweet(+id, req.body['tweets'])
  }
}
