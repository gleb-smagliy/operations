import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OperationModule } from './operation';
import { DatabaseModule } from './database/database.module';
import { OperationProcessingModule } from './operation.processing';

@Module({
  imports: [ScheduleModule.forRoot(), OperationModule, OperationProcessingModule, DatabaseModule]
})
export class ApiModule {}


