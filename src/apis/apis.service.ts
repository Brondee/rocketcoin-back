import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OfferocDto } from './dto';
import * as md5 from 'md5';
import { ConfigService } from '@nestjs/config';
import { BitcotasksDto } from './dto/bitcotasks.dto';
import { LinksDto } from './dto/links.dto';

@Injectable()
export class ApisService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async parseCpxRequest(
    userId: number,
    status: number,
    transId: number,
    amountLocal: number,
    hash: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    const md5Signature = md5(transId + '-' + this.config.get('CPX_SECRET'));
    console.log(md5Signature, hash);
    if (Number(status) == 1 && user) {
      if (hash === md5Signature) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            tokensAll: {
              increment: Number(amountLocal) * (1 + user.earningBonus),
            },
            curTokens: {
              increment: Number(amountLocal) * (1 + user.earningBonus),
            },
            offerwallCount: {
              increment: Number(amountLocal) * (1 + user.earningBonus),
            },
            offerwallDayCount: {
              increment: Number(amountLocal) * (1 + user.earningBonus),
            },
            offerwallMonthCount: {
              increment: Number(amountLocal) * (1 + user.earningBonus),
            },
          },
          select: {
            id: true,
            tokensAll: true,
            curTokens: true,
          },
        });
        await this.referralSystem(user.id, Number(amountLocal), 'offers');
      } else {
        return new ForbiddenException('signatures dont match');
      }
    }
    console.log({ userId, amountLocal, status, transId });
    return user;
  }

  async parseWannadsRequest(
    userId: number,
    status: string,
    transId: number,
    reward: number,
    signature: string,
  ) {
    const md5Code = md5(
      String(userId) +
        String(transId) +
        String(reward) +
        this.config.get('WANNADS_SECRET'),
    );
    console.log(status, transId, signature, md5Code);

    if (md5Code === signature) {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(userId) },
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          tokensAll: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          curTokens: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          offerwallCount: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          offerwallDayCount: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          offerwallMonthCount: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
        },
        select: {
          id: true,
          tokensAll: true,
          curTokens: true,
        },
      });
      await this.referralSystem(user.id, Number(reward), 'offers');
    } else {
      return new ForbiddenException('md5 codes dont match');
    }

    return 'OK';
  }

  async parseOffersAllRequest(
    userId: number,
    transId: number,
    amount: number,
    ms: string,
  ) {
    const md5Code = md5(
      String(transId) + ':' + this.config.get('OFFERSALL_SECRET'),
    );
    if (md5Code === ms) {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(userId) },
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          tokensAll: {
            increment: Number(amount) * (1 + user.earningBonus),
          },
          curTokens: {
            increment: Number(amount) * (1 + user.earningBonus),
          },
          offerwallCount: {
            increment: Number(amount) * (1 + user.earningBonus),
          },
          offerwallDayCount: {
            increment: Number(amount) * (1 + user.earningBonus),
          },
          offerwallMonthCount: {
            increment: Number(amount) * (1 + user.earningBonus),
          },
        },
        select: {
          id: true,
          tokensAll: true,
          curTokens: true,
        },
      });
      await this.referralSystem(user.id, Number(amount), 'offers');
      return 200;
    } else {
      return new ForbiddenException('md5 codes dont match');
    }
  }

  async parseOfferscryptoGet(userId: number, reward: number) {
    console.log('requested');
    console.log(userId, reward);
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        tokensAll: {
          increment: Number(reward) * (1 + user.earningBonus),
        },
        curTokens: {
          increment: Number(reward) * (1 + user.earningBonus),
        },
        offerwallCount: {
          increment: Number(reward) * (1 + user.earningBonus),
        },
        offerwallDayCount: {
          increment: Number(reward) * (1 + user.earningBonus),
        },
        offerwallMonthCount: {
          increment: Number(reward) * (1 + user.earningBonus),
        },
      },
      select: {
        id: true,
        tokensAll: true,
        curTokens: true,
      },
    });
    await this.referralSystem(user.id, Number(reward), 'offers');
    return 200;
  }

  async parseBitcotasksRequest(dto: BitcotasksDto) {
    const { subId, transId, reward, signature } = dto;
    const md5Code = md5(
      String(subId) +
        String(transId) +
        String(reward) +
        this.config.get('BITCOTASKS_SECRET'),
    );
    console.log(md5Code, dto);
    if (md5Code === signature) {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(subId) },
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          tokensAll: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          curTokens: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          offerwallCount: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          offerwallDayCount: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
          offerwallMonthCount: {
            increment: Number(reward) * (1 + user.earningBonus),
          },
        },
        select: {
          id: true,
          tokensAll: true,
          curTokens: true,
        },
      });
      await this.referralSystem(user.id, Number(reward), 'offers');
      return 'ok';
    } else {
      return new ForbiddenException('md5 codes dont match');
    }
  }

  async parseLinksRequest(dto: LinksDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        tokensAll: { increment: Number(dto.reward) * (1 + user.earningBonus) },
        curTokens: { increment: Number(dto.reward) * (1 + user.earningBonus) },
        linksCount: { increment: 1 },
        linksMonthCount: { increment: 1 },
        linksDayCount: { increment: 1 },
      },
      select: {
        id: true,
        tokensAll: true,
        curTokens: true,
      },
    });
    await this.referralSystem(user.id, Number(dto.reward), 'links');

    const linkInfo = await this.prisma.linkInfo.findFirst({
      where: {
        linkName: dto.linkName,
        userIp: dto.ip,
      },
    });
    if (linkInfo) {
      await this.prisma.linkInfo.update({
        where: {
          id: linkInfo.id,
        },
        data: {
          linkClickCount: { increment: 1 },
          lastClicked: dto.lastClicked,
        },
      });
    } else {
      await this.prisma.linkInfo.create({
        data: {
          linkClickCount: 1,
          linkName: dto.linkName,
          userIp: dto.ip,
          lastClicked: dto.lastClicked,
        },
      });
    }

    console.log(dto.userId, dto.reward, dto.linkName, dto.ip);
    return 200;
  }

  async getLinksInfo(ip: string) {
    const linksInfo = await this.prisma.linkInfo.findMany({
      where: {
        userIp: ip,
      },
    });
    for (let i = 0; i < linksInfo.length; i++) {
      if (
        new Date().getDate() > new Date(linksInfo[i].lastClicked).getDate() ||
        new Date().getMonth() > new Date(linksInfo[i].lastClicked).getMonth() ||
        new Date().getFullYear() >
          new Date(linksInfo[i].lastClicked).getFullYear()
      ) {
        await this.prisma.linkInfo.update({
          where: {
            id: linksInfo[i].id,
          },
          data: {
            linkClickCount: 0,
          },
        });
      }
    }
    return await this.prisma.linkInfo.findMany({
      where: {
        userIp: ip,
      },
    });
  }

  async referralSystem(userId: number, amount: number, type: string) {
    const referralInfo = await this.prisma.referralInfo.findFirst({
      where: { referralUserId: userId },
    });
    if (referralInfo) {
      let percentage = 0.01;
      if (type === 'links') {
        percentage = 0.1;
      } else if (type === 'offers') {
        percentage = 0.05;
      }
      const reqUser = await this.prisma.user.findUnique({
        where: { id: referralInfo.userId },
      });
      if (reqUser.ptcDayCount >= 2) {
        await this.prisma.referralInfo.update({
          where: { id: referralInfo.id },
          data: {
            earnedCoins: {
              increment: amount * percentage,
            },
          },
        });
        await this.prisma.user.update({
          where: {
            id: referralInfo.userId,
          },
          data: {
            tokensAll: {
              increment: amount * percentage,
            },
            curTokens: {
              increment: amount * percentage,
            },
          },
        });
        console.log('referral amount added');
      } else {
        console.log(`referral: ptcdaycount is ${reqUser.ptcDayCount}`);
      }
    }
  }
}
