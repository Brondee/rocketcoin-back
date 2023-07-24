import { Controller, Get, Query, Post, Body, Ip } from '@nestjs/common';
import { ApisService } from './apis.service';
import { OfferocDto } from './dto';
import { BitcotasksDto } from './dto/bitcotasks.dto';
import { LinksDto } from './dto/links.dto';

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

  @Get('ayet')
  parseAyetRequest(
    @Query('external_identifier') userId: number,
    @Query('transaction_id') transId: number,
    @Query('amount') amount: number,
  ) {
    return this.apisService.parseAyetRequest(userId, transId, amount);
  }

  @Post('bitcotasks')
  parseBitcotasksRequest(@Body() dto: BitcotasksDto) {
    return this.apisService.parseBitcotasksRequest(dto);
  }

  @Post('offeroc')
  parseOfferocRequest(@Body() dto: any) {
    return this.apisService.parseOfferocRequest(dto);
  }

  @Get('getofferoc')
  parseOfferocGetRequest() {
    return this.apisService.parseOfferocGetRequest();
  }

  @Post('links')
  parseLinksRequest(@Body() dto: LinksDto, @Ip() ip: string) {
    return this.apisService.parseLinksRequest(dto, ip);
  }

  @Get('links_info')
  getLinksInfo(@Ip() ip: string) {
    return this.apisService.getLinksInfo(ip);
  }
}
