import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UserRegistrasionDTO } from '../dto/userRegistration.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser(){
    return this.usersService.getAllUser()
  }

  @Get(':email')
  getUserByEmail(@Param('email') email:string){
    console.log(email)
    return this.usersService.getUserByEmail(email)
  }

  @Patch('bio/:email')
  updateBio(@Param('email') email:string, @Request() req){
    return this.usersService.updateBioUser(email, req.body['bio'])
  }

  // @Get('/:email/:username')
  // getUserByUsername(@Param('email') email:string, @Param('username') username: string){
  //   return this.usersService.getUserByUsername(email, username)
  // }

  @Post()
  createUser(@Request() req){
    const user: UserRegistrasionDTO = {'email': req.body['email'], 'username': req.body['username'], 'bio': req.body['bio']}
    return this.usersService.createUser(user)
  }

  @Get('friend/:email')
  getAllFriend(@Param('email') email:string){
    return this.usersService.getAllFriend(email)
  }

  @Patch('friend')
  addFriend(@Request() req){
    return this.usersService.addFriend(req.body['email'], req.body['usernameFriend']);
  }

  // @Get('closeFriend/:email')
  // getAllCloseFriend(@Param('email') email:string){
  //   return this.usersService.getAllCloseFriend(email)
  // }

  @Patch('closeFriend')
  addCloseFriend(@Request() req){
    return this.usersService.addCloseFriend(req.body['email'], req.body['cf']);
  }
}
