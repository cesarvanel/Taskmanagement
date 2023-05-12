import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.validation';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll(@Query(ValidationPipe) filterDto :TaskFilterDto ): Promise<Task[]> {
    return this.taskService.findAllBy(filterDto);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findOneById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.taskService.delete(id);
  }

  @Patch(':id/status')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return await this.taskService.update(id, status);
  }
}
