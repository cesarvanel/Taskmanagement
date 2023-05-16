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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.validation';
import { Task } from './task.entity';
import { TaskStatus } from './interfaces/task.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decoration';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll(
    @Query(ValidationPipe) filterDto: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.findAllBy(filterDto, user);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findOneById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
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
