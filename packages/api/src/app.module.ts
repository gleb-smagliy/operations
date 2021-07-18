import { Module } from '@nestjs/common';
import { OperationModule } from './operation/operation.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [OperationModule, DatabaseModule]
})
export class AppModule {}


