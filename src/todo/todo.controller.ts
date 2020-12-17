import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateTaskDto from '../user/dto/create-task.dto';
import { TodoService } from './todo.service';
import TagEntity from '../db/tag.entity';
import TaskCategoryEntity from '../db/taskCategory.entity';
import TaskEntity from '../db/task.entity';
import TaskItemEntity from '../db/taskItem.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('task')
  @ApiResponse({ status: 200, description: 'create new todo task' })
  createTask(@Body() task: CreateTaskDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.todoService.addTask(userId, task);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('task')
  @ApiResponse({ status: 200, description: 'create new todo task' })
  changeTask(@Query('taskId') taskId: number, @Body() task: CreateTaskDto) {
    return this.todoService.changeTask(taskId, task);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('tags')
  @ApiResponse({ status: 200, description: 'get all defined tags' })
  getTags() {
    return this.todoService.getTags();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('tag')
  @ApiResponse({ status: 200, description: 'create new tag' })
  createTag(@Query('tagName') tagName: string) {
    return this.todoService.createTag(tagName);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('tag')
  @ApiResponse({ status: 200, description: 'create new tag' })
  getTag(@Query('tagName') tagName: string): Promise<TagEntity> {
    return this.todoService.getTag(tagName);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('task/categories')
  @ApiResponse({ status: 200, description: 'get all defined tasks categories' })
  getTaskCategories() {
    return this.todoService.getCategories();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('task/category')
  @ApiResponse({ status: 200, description: 'create new task category' })
  createTaskCategory(@Query('type') type: string) {
    return this.todoService.createCategory(type);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('task/category')
  @ApiResponse({ status: 200, description: 'create new tag' })
  getTaskCategory(@Query('type') type: string): Promise<TaskCategoryEntity> {
    return this.todoService.getCategory(type);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('task')
  @ApiResponse({ status: 200, description: 'delete task' })
  deleteTask(@Query('taskId') taskId: number): Promise<TaskEntity> {
    return this.todoService.deleteTask(taskId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('taskItem')
  @ApiResponse({ status: 200, description: 'delete task item' })
  async deleteTaskItem(
    @Query('taskItemId') taskItemId: number,
  ): Promise<TaskItemEntity> {
    return await this.todoService.deleteTaskItem(taskItemId);
  }
}
