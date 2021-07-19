import { Module } from '@nestjs/common';
import { OperationProcessingTask } from './operation.processing.task';

@Module({
  imports: [OperationProcessingTask]
})
export class OperationProcessingModule {}


