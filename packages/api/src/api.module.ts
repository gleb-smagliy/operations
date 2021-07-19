import { Module } from '@nestjs/common';
import { OperationModule } from './operation';
import { OperationApiModule } from './operation.api';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [OperationModule, OperationApiModule, DatabaseModule]
})
export class ApiModule {}


