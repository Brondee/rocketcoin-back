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
      if (dto.promocode) {
        const targetUser = await this.prisma.user.findUnique({
          where: { referralCode: dto.promocode },
        });
        if (!targetUser) throw new NotFoundException('promocode is not found');
        const isPromoActivatedByUser = await this.prisma.referralInfo.findFirst(
          {
            where: {
              referralUserId: userId,
            },
          },
        );
        if (!isPromoActivatedByUser) {
          await this.prisma.referralInfo.create({
            data: {
              referralUserId: userId,
              referralUserName: dto.name,
              userId: targetUser.id,
            },
          });
        }
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
  async addTokens(userId: number, dto: { tokens: number }) {
    const userBd = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const referralInfo = await this.prisma.referralInfo.findFirst({
      where: { referralUserId: userId },
    });
    if (referralInfo) {
      await this.prisma.user.update({
        where: {
          id: referralInfo.userId,
        },
        data: {
          tokensAll: {
            increment: dto.tokens * 0.01,
          },
          curTokens: {
            increment: dto.tokens * 0.01,
          },
        },
      });
      console.log('referral amount added');
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
    if (level === 1 && curLevelExp >= 100) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 2 && curLevelExp >= 300) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 3 && curLevelExp >= 50) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 4 && curLevelExp >= 500) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 5 && curLevelExp >= 600) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 6 && curLevelExp >= 700) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 7 && curLevelExp >= 800) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 8 && curLevelExp >= 900) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 9 && curLevelExp >= 1000) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level === 10 && curLevelExp >= 1500) {
      newLevel = level + 1;
      newExp = 0;
    } else if (level > 10 && curLevelExp >= 5000) {
      newLevel = level + 1;
      newExp = 0;
    } else {
      newLevel = level;
      newExp = curLevelExp + dto.exp;
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
