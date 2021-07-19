import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProcessOperations } from '../operation';

// move this to configuration
const MARK_PROCESSED_SCHEDULE = process.env.MARK_PROCESSED_SCHEDULE || CronExpression.EVERY_5_SECONDS;
const BATCH_SIZE = 5;
const TIME_OFFSET_SECONDS = 5;

@Injectable()
export class OperationProcessingTask {
  private readonly logger = new Logger(OperationProcessingTask.name);

  constructor(
    private readonly commmandBus: CommandBus
  ) {}

  @Cron(MARK_PROCESSED_SCHEDULE)
  async markProcessed() {
    // todo: move this logic to the operation module (as it's a bussines logic)
    this.logger.debug(`Processing ${BATCH_SIZE} operations for -${TIME_OFFSET_SECONDS} offset`);
    const olderThan = new Date(Date.now() - TIME_OFFSET_SECONDS * 1000);

    await this.commmandBus.execute(new ProcessOperations(BATCH_SIZE, olderThan));
  }
}