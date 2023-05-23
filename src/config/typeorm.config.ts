import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/auth/user.entity';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.TYPE || dbConfig.type,
  host: process.env.HOST || dbConfig.host,
  username: process.env.NAME || dbConfig.username,
  port: process.env.DB_PORT || dbConfig.port,
  password: process.env.PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [Task, User],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};


