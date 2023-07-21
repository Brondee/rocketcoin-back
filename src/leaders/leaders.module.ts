import { Module } from '@nestjs/common';
import { LeadersService } from './leaders.service';
import { LeadersController } from './leaders.controller';

@Module({
  providers: [LeadersService],
  controllers: [LeadersController]
})
export class LeadersModule {}
