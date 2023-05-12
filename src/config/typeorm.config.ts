import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type:'mysql', 
    host: 'localhost',
    username : 'root',
    port:3306,
    password : 'Bankai',
    database: 'taskmanagement', 
    entities: [Task], 
    synchronize:true, 



}