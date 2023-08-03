import { Module } from '@nestjs/common';
import { PtcService } from './ptc.service';
import { PtcController } from './ptc.controller';

@Module({
  providers: [PtcService],
  controllers: [PtcController]
})
export class PtcModule {}
