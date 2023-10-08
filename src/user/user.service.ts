import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { EditUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as schedule from 'node-schedule';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        referrals: true,
      },
    });
    delete user.password;
    return user;
  }
  async editUser(userId: number, dto: EditUserDto) {
    try {
      if (dto.earningBonus) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            earningBonus: { increment: dto.earningBonus },
          },
        });
        delete dto.earningBonus;
      }
      if (dto.tokens) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            tokensAll: { increment: dto.tokens },
            curTokens: { increment: dto.tokens },
          },
        });
        delete dto.tokens;
      }
      if (dto.password) {
        const hash = await argon.hash(dto.password);
        delete dto.password;
        const user = await this.prisma.user.update({
          where: { id: userId },
          data: { ...dto, password: hash },
        });
        delete user.password;
        return user;
      } else {
        const user = await this.prisma.user.update({
          where: { id: userId },
          data: { ...dto },
        });
        delete user.password;
        return user;
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target[0] === 'email') {
            throw new ForbiddenException('Credentials taken in email');
          }
        }
      }
      throw error;
    }
  }
  async addTokens(userId: number, dto: { tokens: number; type: string }) {
    const userBd = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const referralInfo = await this.prisma.referralInfo.findFirst({
      where: { referralUserId: userId },
    });
    if (referralInfo) {
      let percentage = 0.01;
      if (dto.type === 'faucet') {
        percentage = 0.5;
      } else if (dto.type === 'offers') {
        percentage = 0.05;
      } else if (
        dto.type === 'links' ||
        dto.type === 'ptc' ||
        dto.type === 'files' ||
        dto.type === 'tasks'
      ) {
        percentage = 0.1;
      } else if (dto.type === 'level') {
        percentage = 0;
      }
      const reqUser = await this.prisma.user.findUnique({
        where: { id: referralInfo.userId },
      });
      if (reqUser.ptcDayCount >= 2) {
        await this.prisma.referralInfo.update({
          where: { id: referralInfo.id },
          data: {
            earnedCoins: {
              increment: dto.tokens * percentage,
            },
          },
        });
        await this.prisma.user.update({
          where: {
            id: referralInfo.userId,
          },
          data: {
            tokensAll: {
              increment: dto.tokens * percentage,
            },
            curTokens: {
              increment: dto.tokens * percentage,
            },
          },
        });
        console.log('referral amount added');
      } else {
        console.log(`referral: ptcdaycount is ${reqUser.ptcDayCount}`);
      }
    }
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tokensAll: { increment: dto.tokens * (1 + userBd.earningBonus) },
        curTokens: { increment: dto.tokens * (1 + userBd.earningBonus) },
      },
    });
  }
  async editLevel(userId: number, dto: { exp: number }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const { level, curLevelExp } = user;
    let newLevel = 0;
    let newExp = 0;
    if (level === 0 && curLevelExp >= 1000) {
      newLevel = level + 1;
    } else if (curLevelExp >= 1000 + 100 * level) {
      newLevel = level + 1;
    } else {
      newExp = curLevelExp + dto.exp;
      newLevel = level;
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        level: newLevel,
        exp: { increment: dto.exp },
        expMonthCount: { increment: dto.exp },
        curLevelExp: newExp,
      },
    });
    delete newUser.password;
    return newUser;
  }
  async reduceTokens(userId: number, tokens: number, type: string) {
    if (type === 'invest')
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          investedTokens: { decrement: Number(tokens) },
        },
      });
    else {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          curTokens: { decrement: Number(tokens) },
        },
      });
    }
  }

  incrementTasksCount(userId: number, dto: { type: string }) {
    const { type } = dto;
    if (type === 'faucet') {
      return this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          faucetCount: { increment: 1 },
          faucetMonthCount: { increment: 1 },
          faucetDayCount: { increment: 1 },
        },
      });
    } else if (type === 'links') {
      return this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          linksCount: { increment: 1 },
          linksMonthCount: { increment: 1 },
          linksDayCount: { increment: 1 },
        },
      });
    } else if (type === 'ptc') {
      return this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ptcCount: { increment: 1 },
          ptcMonthCount: { increment: 1 },
          ptcDayCount: { increment: 1 },
        },
      });
    }
  }

  async addFaucetPay(userId: number, amountUsdt: string) {
    const userFind = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
        lastWithdraw: new Date().toLocaleDateString("en-US"),
      },
    });
    if (userFind) {
      return this.prisma.user.update({
        where: { id: userFind.id },
        data: {
          investedTokens: { increment: Math.round(Number(amountUsdt) * 33333) },
        },
      });
    } else {
      return new NotFoundException('user not found');
    }
  }

  job = schedule.scheduleJob('0 * * *', async () => {
    await this.prisma.user.updateMany({
      data: {
        faucetDayCount: 0,
        linksDayCount: 0,
        ptcDayCount: 0,
        offerwallDayCount: 0,
        ptcChallengesClaimed: 0,
        linksChallengesClaimed: 0,
        faucetChallengesClaimed: 0,
        offerwallChallengesClaimed: 0,
      },
    });

    console.log('leaders reward setted and table reseted');
  });
}
