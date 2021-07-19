import { Operation, OperationStatus } from './operation.entity';
import { OperationProcessed } from './operation-processed.event';

describe('Operation', () => {
    describe('process', () => {
        const TEST_ID = 'test_id';

        for(const status of [OperationStatus.Done, OperationStatus.Failed])
        {
            it(`should switch operation to the ${status} status and add OperationProcessed event to the AggregationRoot`, () => 
            {
                const op = new Operation();
                op.id = TEST_ID;
                op.status = OperationStatus.InProgress;

                op.process(status);

                expect(op.status).toEqual(status);
                expect(op.getUncommittedEvents()).toEqual([
                    new OperationProcessed(op.id, status)
                ]);
            });
        }

        it('should not change status to the same one', () => 
        {
            const op = new Operation();
            op.status = OperationStatus.Done;
            op.process(OperationStatus.Done);

            expect(op.status).toEqual(OperationStatus.Done);
            expect(op.getUncommittedEvents()).toHaveLength(0);
        })
    });
})