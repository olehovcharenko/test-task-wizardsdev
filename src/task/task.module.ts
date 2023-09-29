import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { databaseProvider } from '../database.provider';
import { TaskService } from './task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, databaseProvider],
})
export class TaskModule {}
