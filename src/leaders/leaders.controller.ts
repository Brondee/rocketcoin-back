import { Controller, Get } from '@nestjs/common';
import { LeadersService } from './leaders.service';

@Controller('leaders')
export class LeadersController {
  constructor(private leaderService: LeadersService) {}

  @Get('info')
  getLeadersInfo() {
    return this.leaderService.getLeadersInfo();
  }
}
