import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from '@nestjs/cqrs';

import { Operation } from "./operation.entity";
import { OperationService } from "./operation.service";
import { ProcessOperationsCommandHandler } from './process-operation.handler';

const typeOrmModule = TypeOrmModule.forFeature([Operation]);

@Global()
@Module({
  imports: [typeOrmModule, CqrsModule],
  providers: [OperationService, ProcessOperationsCommandHandler],
  exports: [OperationService, typeOrmModule, CqrsModule],
})
export class OperationModule {}