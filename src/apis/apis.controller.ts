import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApisService } from './apis.service';
import { OfferocDto } from './dto';

@Controller('apis')
export class ApisController {
  constructor(private apisService: ApisService) {}

  @Get('adgem')
  parseAdGemRequest(
    @Query('user_id') userId: number,
    @Query('amount') amount: number,
  ) {
    return this.apisService.parseAdGemRequest(userId, amount);
  }

  @Post('offeroc')
  parseOfferocRequest(@Body() dto: OfferocDto) {
    return this.apisService.parseOfferocRequest(dto);
  }
}
