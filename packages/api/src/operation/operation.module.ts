import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Operation } from "./operation.entity";
import { OperationService } from "./operation.service";
import { OperationController } from "./operation.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  providers: [OperationService],
  exports: [OperationService],
  controllers: [OperationController],
})
export class OperationModule {}