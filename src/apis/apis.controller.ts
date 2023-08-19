import { Controller, Get, Query, Post, Body, Req } from '@nestjs/common';
import { ApisService } from './apis.service';
import { BitcotasksDto } from './dto/bitcotasks.dto';
import { LinksDto } from './dto/links.dto';

@Controller('apis')
export class ApisController {
  constructor(private apisService: ApisService) {}

  @Get('cpx')
  parseCpxRequest(
    @Query('user_id') userId: number,
    @Query('status') status: number,
    @Query('trans_id') transId: number,
    @Query('amount_local') amountLocal: number,
    @Query('hash') hash: string,
  ) {
    return this.apisService.parseCpxRequest(
      userId,
      status,
      transId,
      amountLocal,
      hash,
    );
  }

  @Get('wannads')
  parseWannadsRequest(
    @Query('user_id') userId: number,
    @Query('status') status: string,
    @Query('transaction_id') transId: number,
    @Query('reward') reward: number,
    @Query('signature') signature: string,
  ) {
    return this.apisService.parseWannadsRequest(
      userId,
      status,
      transId,
      reward,
      signature,
    );
  }

  @Get('offersall')
  parseOffersAllRequest(
    @Query('user_id') userId: number,
    @Query('transaction_id') transId: number,
    @Query('amount') amount: number,
    @Query('ms') ms: string,
  ) {
    return this.apisService.parseOffersAllRequest(userId, transId, amount, ms);
  }

  @Post('bitcotasks')
  parseBitcotasksRequest(@Body() dto: BitcotasksDto) {
    return this.apisService.parseBitcotasksRequest(dto);
  }

  @Get('offerscrypto_get')
  parseOfferscryptoGet(
    @Query('user_id') userId: number,
    @Query('reward') reward: number,
  ) {
    return this.apisService.parseOfferscryptoGet(userId, reward);
  }

  @Get('clix')
  parseClixRequest(
    @Query('user_id') userId: number,
    @Query('reward') reward: number,
  ) {
    return this.apisService.parseOfferscryptoGet(userId, reward);
  }

  @Post('links')
  parseLinksRequest(@Body() dto: LinksDto) {
    return this.apisService.parseLinksRequest(dto);
  }

  @Get('links_info')
  getLinksInfo(@Query('ip') ip: string) {
    return this.apisService.getLinksInfo(ip);
  }
}
