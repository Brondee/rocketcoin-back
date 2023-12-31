import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as schedule from 'node-schedule';

@Injectable()
export class LeadersService {
  constructor(private prisma: PrismaService) {}

  async getLeadersInfo() {
    const ptcLeaders = await this.prisma.user.findMany({
      orderBy: {
        ptcMonthCount: 'desc',
      },
      take: 3,
    });
    const linksLeaders = await this.prisma.user.findMany({
      orderBy: {
        linksMonthCount: 'desc',
      },
      take: 3,
    });
    const faucetLeaders = await this.prisma.user.findMany({
      orderBy: {
        faucetMonthCount: 'desc',
      },
      take: 3,
    });
    const offerwallLeaders = await this.prisma.user.findMany({
      orderBy: {
        offerwallMonthCount: 'desc',
      },
      take: 3,
    });
    const expLeaders = await this.prisma.user.findMany({
      orderBy: {
        expMonthCount: 'desc',
      },
      take: 3,
    });

    return {
      ptcLeaders,
      linksLeaders,
      faucetLeaders,
      offerwallLeaders,
      expLeaders,
    };
  }

  job = schedule.scheduleJob('* * * * * 1', async () => {
    const leadersGeneral = await this.prisma.leadersGeneral.findFirst();
    if (!leadersGeneral) {
      await this.prisma.leadersGeneral.create({
        data: {
          tablesResetMonth: new Date().getDate(),
        },
      });
    }
    console.log(leadersGeneral?.tablesResetMonth);

    if (
      !leadersGeneral ||
      leadersGeneral?.tablesResetMonth !== new Date().getDate()
    ) {
      const ptcRewards = [60000, 30000, 15000];
      const linksRewards = [100000, 50000, 25000];
      const faucetRewards = [60000, 30000, 15000];
      const offerwallRewards = [100000, 50000, 25000];
      const expRewards = [15000, 10000, 5000];

      const ptcLeaders = await this.prisma.user.findMany({
        orderBy: {
          ptcMonthCount: 'desc',
        },
        take: 3,
      });
      for (let i = 0; i < ptcLeaders.length; i++) {
        await this.prisma.user.update({
          where: {
            id: ptcLeaders[i].id,
          },
          data: {
            tokensAll: { increment: ptcRewards[i] },
            curTokens: { increment: ptcRewards[i] },
          },
        });
      }
      const linksLeaders = await this.prisma.user.findMany({
        orderBy: {
          linksMonthCount: 'desc',
        },
        take: 3,
      });
      for (let i = 0; i < linksLeaders.length; i++) {
        await this.prisma.user.update({
          where: {
            id: linksLeaders[i].id,
          },
          data: {
            tokensAll: { increment: linksRewards[i] },
            curTokens: { increment: linksRewards[i] },
          },
        });
      }
      const faucetLeaders = await this.prisma.user.findMany({
        orderBy: {
          faucetMonthCount: 'desc',
        },
        take: 3,
      });
      for (let i = 0; i < faucetLeaders.length; i++) {
        await this.prisma.user.update({
          where: {
            id: faucetLeaders[i].id,
          },
          data: {
            tokensAll: { increment: faucetRewards[i] },
            curTokens: { increment: faucetRewards[i] },
          },
        });
      }
      const offerwallLeaders = await this.prisma.user.findMany({
        orderBy: {
          offerwallMonthCount: 'desc',
        },
        take: 3,
      });
      for (let i = 0; i < offerwallLeaders.length; i++) {
        await this.prisma.user.update({
          where: {
            id: offerwallLeaders[i].id,
          },
          data: {
            tokensAll: { increment: offerwallRewards[i] },
            curTokens: { increment: offerwallRewards[i] },
          },
        });
      }
      const expLeaders = await this.prisma.user.findMany({
        orderBy: {
          expMonthCount: 'desc',
        },
        take: 3,
      });
      for (let i = 0; i < expLeaders.length; i++) {
        await this.prisma.user.update({
          where: {
            id: expLeaders[i].id,
          },
          data: {
            tokensAll: { increment: expRewards[i] },
            curTokens: { increment: expRewards[i] },
          },
        });
      }

      await this.prisma.user.updateMany({
        data: {
          ptcMonthCount: 0,
          linksMonthCount: 0,
          faucetMonthCount: 0,
          offerwallMonthCount: 0,
          expMonthCount: 0,
        },
      });
      await this.prisma.leadersGeneral.update({
        where: {
          id: leadersGeneral?.id,
        },
        data: {
          tablesResetMonth: new Date().getDate(),
        },
      });

      console.log('leaders reward setted and table reseted');
    }
  });
}
