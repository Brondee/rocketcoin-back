import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AddArticleDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('all')
  getAllArticles() {
    return this.articleService.getAllArticles();
  }

  @Get('three')
  getFirstThree() {
    return this.articleService.getFirstThree();
  }

  @Get('single/:id')
  getArticleById(@Param('id') id: number) {
    return this.articleService.getArticleById(id);
  }

  @Get('/img/:filepath')
  getImg(@Param('filepath') filePath: string, @Res() res) {
    return res.sendFile(filePath, { root: 'uploads' });
  }

  @Post('add')
  addArticle(@Body() dto: AddArticleDto) {
    return this.articleService.addArticle(dto);
  }

  @Post('upload/:articleId')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('articleId', ParseIntPipe) id: number,
  ) {
    console.log(file.path);
    const path = file.path.slice(8);
    return this.articleService.setImgUrl(path, id);
  }

  @UseGuards(JwtGuard)
  @Patch('views/:id')
  incrementViews(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.articleService.incrementViews(id, userId);
  }

  @Delete('del/:id')
  removeArticle(@Param('id') id: number) {
    return this.articleService.removeArticle(id);
  }
}
