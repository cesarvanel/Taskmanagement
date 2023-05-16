import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type:  "mysql",
  host: process.env.HOST || 'localhost',
  username: process.env.NAME  || 'root',
  port: 3306,
  password: process.env.PASSWORD || 'Bankai',
  database: process.env.DB_NAME || 'taskmanagement',
  entities: [Task, User],
  synchronize: true,
};


/*   type: process.env.TYPE as 'mysql',
  host: process.env.HOST,
  username: process.env.NAME,
  port: 3306,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task, User],
  synchronize: true,*/
