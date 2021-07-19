export class ProcessOperations {
    constructor(
        readonly batchSize: number,
        readonly olderThan: Date
    ) {}
}