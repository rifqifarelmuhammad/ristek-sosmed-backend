import { Controller,Get, Post, Param, Request, Delete, Patch } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarDTO } from '../dto/avatar'

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get(':email')
  getAvatarByEmail(@Param('email') email:string){
    return this.avatarService.getAvatarByEmail(email)
  }

  @Post()
  postAvatar(@Request() req){
    const ava: AvatarDTO = {'email': req.body["email"], "fileAvatar": req.body["public_id"], "urlAvatar": req.body["url"]}
    return this.avatarService.postAvatar(ava)
  }

  @Delete(':email')
  deleteAvatar(@Param('email') email: string){
    return this.avatarService.deleteAvatar(email)
  }

  @Patch(':email')
  updateAvatar(@Param('email') email: string, @Request() req){
    const ava: Partial<AvatarDTO> = {'fileAvatar': req.body["public_id"], "urlAvatar": req.body["url"]}
    return this.avatarService.updateAvatar(email, ava)
  }
}
