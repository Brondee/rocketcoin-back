import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFileDto, EditApproveDto } from './dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  getAllFiles(userId: number) {
    return this.prisma.file.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        approves: { where: { userId } },
      },
    });
  }

  getAllApproveFiles() {
    return this.prisma.fileApprove.findMany({
      where: {
        isApproved: false,
      },
      include: {
        file: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  getFileById(id: number) {
    return this.prisma.file.findUnique({ where: { id: Number(id) } });
  }

  async getFileApproveById(id: number) {
    const file = await this.prisma.fileApprove.findUnique({
      where: { id: Number(id) },
      include: {
        file: true,
        files: true,
      },
    });
    return file;
  }

  editApproveFile(dto: EditApproveDto) {
    return this.prisma.fileApprove.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });
  }

  addNewFile(dto: AddFileDto) {
    return this.prisma.file.create({ data: { ...dto } });
  }

  addNewApproveFile(fileId: number, userId: number) {
    return this.prisma.fileApprove.create({
      data: { userId, fileId: Number(fileId) },
    });
  }

  setFileUrl(path: string, id: number) {
    return this.prisma.fileApproveImg.create({
      data: {
        fileApproveId: id,
        fileUrl: path,
      },
    });
  }

  deleteFile(id: number) {
    return this.prisma.fileApprove.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
