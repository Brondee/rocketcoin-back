import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { PtcService } from './ptc.service';
import { AddPtcDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('ptc')
export class PtcController {
  constructor(private readonly ptcService: PtcService) {}

  @UseGuards(JwtGuard)
  @Get('all/:type')
  getAllByType(@GetUser('id') userId: number, @Param('type') type: string) {
    return this.ptcService.getAllByType(userId, type);
  }

  @Get('single/:id')
  getPtcById(@Param('id') id: number) {
    return this.ptcService.getPtcById(id);
  }

  @Post('add')
  addNewPtc(@Body() dto: AddPtcDto) {
    return this.ptcService.addNewPtc(dto);
  }

  @Delete('del/:id')
  deletePtcById(@Param('id') id: number) {
    return this.ptcService.deletePtcById(id);
  }

  @UseGuards(JwtGuard)
  @Patch('claimed')
  setPtcClaimed(
    @GetUser('id') userId: number,
    @Body() dto: { ptcId: number; lastTaken: string },
  ) {
    return this.ptcService.setsetPtcClaimed(userId, dto);
  }
}
