import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPtcDto } from './dto';

@Injectable()
export class PtcService {
  constructor(private prisma: PrismaService) {}

  getAllByType(userId: number, type: string) {
    return this.prisma.ptc.findMany({
      where: { ptcType: type },
      orderBy: {
        tokensReward: 'desc',
      },
      include: {
        ptcClaims: { where: { userId } },
      },
    });
  }

  getPtcById(id: number) {
    return this.prisma.ptc.findUnique({
      where: { id: Number(id) },
    });
  }

  addNewPtc(dto: AddPtcDto) {
    return this.prisma.ptc.create({
      data: {
        ...dto,
      },
    });
  }

  deletePtcById(id: number) {
    return this.prisma.ptc.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async setsetPtcClaimed(
    userId: number,
    dto: { ptcId: number; lastTaken: string },
  ) {
    const ptc = await this.prisma.ptc.update({
      where: {
        id: dto.ptcId,
      },
      data: {
        viewsCount: { increment: 1 },
      },
    });
    if (ptc.viewsCount >= ptc.viewsTotal) {
      return await this.prisma.ptc.delete({
        where: {
          id: ptc.id,
        },
      });
    } else {
      const ptcClaimed = await this.prisma.ptcClaimed.findFirst({
        where: {
          userId: userId,
          ptcId: dto.ptcId,
        },
      });
      if (!ptcClaimed) {
        return await this.prisma.ptcClaimed.create({
          data: {
            userId: userId,
            ptcId: dto.ptcId,
            lastTaken: dto.lastTaken,
          },
        });
      } else {
        return await this.prisma.ptcClaimed.update({
          where: {
            id: ptcClaimed.id,
          },
          data: {
            lastTaken: dto.lastTaken,
          },
        });
      }
    }
  }
}
