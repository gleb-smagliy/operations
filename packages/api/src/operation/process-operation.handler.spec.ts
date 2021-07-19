import { Logger } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ProcessOperationsCommandHandler } from './process-operation.handler';
import { ProcessOperations } from './process-operation.command';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Operation, OperationStatus } from './operation.entity';

describe('ProcessOperationsCommandHandler', () => {
    let logger: Logger;
    let eventPublisher: EventPublisher;
    let repository: Repository<Operation>;
    let queryBuilder: SelectQueryBuilder<Operation>
    let handler: ProcessOperationsCommandHandler;

    const BATCH_SIZE = 15;
    const olderThan = new Date();

    beforeEach(() => {
        eventPublisher = {
            mergeObjectContext: jest.fn()
        } as unknown as EventPublisher;

        queryBuilder = {
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue([]),
        } as unknown as SelectQueryBuilder<Operation>;

        repository = {
            createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
            save: jest.fn()
        } as unknown as Repository<Operation>;

        logger = {
            debug: jest.fn()
        } as unknown as Logger;

        handler = new ProcessOperationsCommandHandler(repository, eventPublisher, logger);
    });

    it('should use cmd args for the query', async () => {
        await handler.execute(new ProcessOperations(BATCH_SIZE, olderThan));

        expect(queryBuilder.where).toHaveBeenCalledWith(expect.any(String), { date: olderThan.toISOString() });
        expect(queryBuilder.limit).toHaveBeenCalledWith(BATCH_SIZE);
    });

    it('should mark all operations from the repository as either Done or Failed', async () => {
        const operations = [
            new Operation(),
            new Operation(),
            new Operation()
        ];

        (queryBuilder.getMany as jest.Mock).mockResolvedValueOnce(operations);
        await handler.execute(new ProcessOperations(BATCH_SIZE, olderThan));
        
        expect(eventPublisher.mergeObjectContext).toHaveBeenCalledTimes(3);
        const [[savedOperations]] = (repository.save as jest.Mock).mock.calls;

        savedOperations.forEach(op => {
            expect([ OperationStatus.Done, OperationStatus.Failed ]).toContain(op.status);
        });
    });
})