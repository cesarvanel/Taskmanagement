import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../task.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly alloWedStatus = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    console.log('value', value);
    console.log('metadata', metadata);
    if (!this.isStatutValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatutValid(status: any) {
    const index = this.alloWedStatus.indexOf(status);

    return index !== -1;
  }
}
