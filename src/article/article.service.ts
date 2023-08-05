import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  getAllArticles() {
    return this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        imgs: true,
        views: true,
      },
    });
  }

  getFirstThree() {
    return this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        imgs: true,
        views: true,
      },
      take: 3,
    });
  }

  getArticleById(id: number) {
    return this.prisma.article.findUnique({
      where: { id: Number(id) },
    });
  }

  addArticle(dto: AddArticleDto) {
    return this.prisma.article.create({
      data: {
        ...dto,
      },
    });
  }

  setImgUrl(path: string, id: number) {
    return this.prisma.articleImg.create({
      data: {
        articleId: id,
        fileUrl: path,
      },
    });
  }

  async incrementViews(id: number, userId: number) {
    const view = await this.prisma.userArticleSeen.findFirst({
      where: {
        userId,
        articleId: id,
      },
    });
    if (!view) {
      return this.prisma.userArticleSeen.create({
        data: {
          userId,
          articleId: id,
        },
      });
    }
  }

  removeArticle(id: number) {
    return this.prisma.article.delete({
      where: { id: Number(id) },
    });
  }
}
