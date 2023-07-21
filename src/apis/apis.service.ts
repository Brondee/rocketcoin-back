import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OfferocDto } from './dto';
import * as md5 from 'md5';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApisService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async parseAdGemRequest(userId: number, amount: number) {
    const user = await this.prisma.user.update({
      where: { id: Number(userId) },
      data: {
        tokensAll: { increment: Number(amount) },
        curTokens: { increment: Number(amount) },
      },
      select: {
        id: true,
        tokensAll: true,
        curTokens: true,
      },
    });
    console.log({ userId, amount });
    return user;
  }

  async parseOfferocRequest(dto: OfferocDto) {
    const user = await this.prisma.user.update({
      where: { id: Number(dto.subId) },
      data: {
        tokensAll: { increment: Number(dto.reward) },
        curTokens: { increment: Number(dto.reward) },
      },
    });
    const md5Signature = md5(
      dto.subId +
        dto.transId +
        String(dto.reward) +
        this.config.get('OFFEROC_SECRET'),
    );

    console.log(user, dto, md5Signature);
    if (md5Signature !== dto.signature) {
      return new ForbiddenException('signatures doesnt match');
    }
    if (user) {
      return 'ok';
    } else {
      return { error: 'error' };
    }
  }
}
