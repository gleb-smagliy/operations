import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { ProcessOperations } from './process-operation.command';
import { Operation, OperationStatus } from './operation.entity';

function getRandomStatus() {
    return Math.random() > 0.5 ?
        OperationStatus.Done :
        OperationStatus.Failed;
}

@CommandHandler(ProcessOperations)
export class ProcessOperationsCommandHandler implements ICommandHandler<ProcessOperations> {
    constructor(
        @InjectRepository(Operation) private readonly repository: Repository<Operation>,
        private readonly eventPublisher: EventPublisher,
        private readonly logger: Logger
    ) {}

    async execute(cmd: ProcessOperations) {
        const date = cmd.olderThan.toISOString();
        this.logger.debug(`Marking operations older than ${date} as processed`);

        const operations = await this.repository.createQueryBuilder("operation")
            .where('operation.createdOn < :date', { date })
            .andWhere('operation.status = :status', { status: OperationStatus.InProgress })
            .limit(cmd.batchSize)
            .getMany();

        this.logger.debug(`queried ${operations.length} operations to be processed`);

        operations.forEach(op => {
            const toStatus = getRandomStatus();
            this.eventPublisher.mergeObjectContext(op);
            op.process(toStatus);
            op.commit();
            this.logger.debug(`Marked operation ${op.id} as ${toStatus}`);
        });

        await this.repository.save(operations);

        this.logger.debug(`marked ${operations.length} operations as processed`);
    }
}