import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UploadedFile,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EditApproveDto } from './dto/edit-approve.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  getAllTasks(@GetUser('id') userId: number) {
    return this.taskService.getAllTasks(userId);
  }

  @Get('all_approve')
  getAllApproveTasks() {
    return this.taskService.getAllApproveTasks();
  }

  @UseGuards(JwtGuard)
  @Get('single/:id')
  getTaskById(@Param('id') id: number, @GetUser('id') userId: number) {
    return this.taskService.getTaskById(id, userId);
  }

  @Get('single_approve/:id')
  getTaskApproveById(@Param('id') id: number) {
    return this.taskService.getTaskApproveById(id);
  }

  @Get('/file/:filepath')
  getFile(@Param('filepath') filePath: string, @Res() res) {
    return res.sendFile(filePath, { root: 'uploads' });
  }

  @Patch('edit')
  editApproveTask(@Body() dto: EditApproveDto) {
    return this.taskService.editApproveTask(dto);
  }

  @Post('add')
  addNewTask(@Body() dto: AddTaskDto) {
    return this.taskService.addNewTask(dto);
  }

  @UseGuards(JwtGuard)
  @Post('approve_add/:taskId')
  addNewApproveTask(
    @Param('taskId') taskId: number,
    @GetUser('id') userId: number,
    @Body() dto: { dopInfo: string },
  ) {
    return this.taskService.addNewApproveTask(taskId, userId, dto);
  }

  @Post('upload/:taskApproveId')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('taskApproveId', ParseIntPipe) id: number,
  ) {
    console.log(file.path);
    const path = file.path.slice(8);
    return this.taskService.setFileUrl(path, id);
  }

  @Delete('del/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
