import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }


  async findOneById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ${id} has NotFound`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  findAllBy(filterDto: TaskFilterDto): Promise<Task[]> {
    return this.taskRepository.findAllBy(filterDto)
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found `);
    }
  }

  async update(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.findOneById(id);
    task.status = status;
    await task.save();

    return task;
  }
}
