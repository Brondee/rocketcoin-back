import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTaskDto } from './dto';
import { EditApproveDto } from './dto/edit-approve.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getAllTasks(userId: number) {
    return this.prisma.task.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        taskApproves: { where: { userId } },
      },
    });
  }

  getAllApproveTasks() {
    return this.prisma.taskApprove.findMany({
      where: {
        isApproved: false,
      },
      include: {
        task: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  getTaskById(id: number, userId: number) {
    return this.prisma.task.findUnique({
      where: { id: Number(id) },
      include: { taskApproves: { where: { userId } } },
    });
  }

  async getTaskApproveById(id: number) {
    const task = await this.prisma.taskApprove.findUnique({
      where: { id: Number(id) },
      include: {
        task: true,
        files: true,
      },
    });
    return task;
  }

  editApproveTask(dto: EditApproveDto) {
    return this.prisma.taskApprove.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });
  }

  addNewTask(dto: AddTaskDto) {
    return this.prisma.task.create({ data: { ...dto } });
  }

  addNewApproveTask(taskId: number, userId: number, dto: { dopInfo: string }) {
    console.log(userId);
    return this.prisma.taskApprove.create({
      data: { userId, taskId: Number(taskId), dopInfo: dto.dopInfo },
    });
  }

  setFileUrl(path: string, id: number) {
    return this.prisma.taskApproveImg.create({
      data: {
        taskApproveId: id,
        fileUrl: path,
      },
    });
  }

  deleteTask(id: number) {
    return this.prisma.taskApprove.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
