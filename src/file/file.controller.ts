import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFileDto, EditApproveDto } from './dto';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  getAllFiles(@GetUser('id') userId: number) {
    return this.fileService.getAllFiles(userId);
  }

  @Get('all_approve')
  getAllApproveFiles() {
    return this.fileService.getAllApproveFiles();
  }

  @Get('single/:id')
  getFileById(@Param('id') id: number) {
    return this.fileService.getFileById(id);
  }

  @Get('single_approve/:id')
  getFileApproveById(@Param('id') id: number) {
    return this.fileService.getFileApproveById(id);
  }

  @Get('/file/:filepath')
  getFile(@Param('filepath') filePath: string, @Res() res) {
    return res.sendFile(filePath, { root: 'uploads' });
  }

  @Patch('edit')
  editApproveFile(@Body() dto: EditApproveDto) {
    return this.fileService.editApproveFile(dto);
  }

  @Post('add')
  addNewFile(@Body() dto: AddFileDto) {
    return this.fileService.addNewFile(dto);
  }

  @UseGuards(JwtGuard)
  @Post('approve_add/:fileId')
  addNewApproveFile(
    @Param('fileId') fileId: number,
    @GetUser('id') userId: number,
  ) {
    return this.fileService.addNewApproveFile(fileId, userId);
  }

  @Post('upload/:fileApproveId')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('fileApproveId', ParseIntPipe) id: number,
  ) {
    console.log(file.path);
    const path = file.path.slice(8);
    return this.fileService.setFileUrl(path, id);
  }

  @Delete('del/:id')
  deleteFile(@Param('id') id: number) {
    return this.fileService.deleteFile(id);
  }
}
