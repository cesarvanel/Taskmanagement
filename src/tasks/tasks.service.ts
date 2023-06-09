import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './interfaces/task.enum';
import { TaskFilterDto } from './dto/task-filter.dto';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findOneById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ${id} has NotFound`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });
    await this.taskRepository.save(task);

    return task;
  }

  async findAllBy(filterDto: TaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    query.where('task.userId =:userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
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
