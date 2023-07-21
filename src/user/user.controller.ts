import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  getUserInfo(@GetUser('id') userId: number) {
    return this.userService.getUserInfo(userId);
  }

  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Patch('levelup')
  editLevel(@GetUser('id') userId: number, @Body() dto: { exp: number }) {
    return this.userService.editLevel(userId, dto);
  }
}
