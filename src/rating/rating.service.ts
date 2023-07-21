import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditRatingDto } from './dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  getRatings() {
    return this.prisma.rating.findMany();
  }

  async editRating(dto: EditRatingDto) {
    const companyRating = await this.prisma.rating.findFirst({
      where: { companyName: dto.companyName },
    });
    if (!companyRating) {
      const newRating = await this.prisma.rating.create({
        data: {
          companyName: dto.companyName,
          curRating: dto.rating,
          ratings: [dto.rating],
        },
      });
      return newRating;
    } else {
      const ratings = companyRating.ratings;
      let curRating = 0;
      for (let i = 0; i < ratings.length; i++) {
        curRating += ratings[i];
      }
      curRating = Math.round(curRating / companyRating.ratings.length);
      const newRating = await this.prisma.rating.update({
        where: {
          id: companyRating.id,
        },
        data: {
          curRating: curRating,
          ratings: { push: dto.rating },
        },
      });
      return newRating;
    }
  }
}
