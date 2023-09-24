import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  ParseIntPipe,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EditUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('info')
  getUserInfo(@GetUser('id') userId: number) {
    return this.userService.getUserInfo(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('tokens')
  addTokens(
    @GetUser('id') userId: number,
    @Body() dto: { tokens: number; type: string },
  ) {
    return this.userService.addTokens(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('tokens_dif/:id')
  addTokensDif(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: { tokens: number; type: string },
  ) {
    return this.userService.addTokens(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('reduce')
  reduceTokens(
    @GetUser('id') userId: number,
    @Body() dto: { tokens: number; type: string },
  ) {
    return this.userService.reduceTokens(userId, dto.tokens, dto.type);
  }

  @UseGuards(JwtGuard)
  @Patch('levelup')
  editLevel(@GetUser('id') userId: number, @Body() dto: { exp: number }) {
    return this.userService.editLevel(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('levelup_dif/:id')
  LevelUpDif(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: { exp: number },
  ) {
    return this.userService.editLevel(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('increment')
  incrementTasksCount(
    @GetUser('id') userId: number,
    @Body() dto: { type: string },
  ) {
    return this.userService.incrementTasksCount(userId, dto);
  }

  @Get('pay_add')
  addFaucetPay(
    @Query('id', ParseIntPipe) userId: number,
    @Query('amount') amountUsdt: string,
  ) {
    return this.userService.addFaucetPay(userId, amountUsdt);
  }
}
