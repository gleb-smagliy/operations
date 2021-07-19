import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { ApiModule } from '../src/api.module';
import { Operation, OperationStatus } from '../src/operation';
import { Api } from '@operations/api.client';

function createOperation(name: string, status: OperationStatus) {
  const op = new Operation();
  op.name = name;
  op.status = status;

  return op;
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repo: Repository<Operation>;

  const operations = [
    createOperation('operation #1', OperationStatus.Failed),
    createOperation('operation #2', OperationStatus.Done),
    createOperation('operation #3', OperationStatus.InProgress)
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    repo = moduleFixture.get<Repository<Operation>>(getRepositoryToken(Operation));

    await repo.query(`DELETE FROM ${repo.metadata.tableName}`);
    await repo.save(operations);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /api/operation', async () => {
    await request(app.getHttpServer())
      .get('/operation')
      .query({ limit: 3, page: 1 })
      .expect(200)
      .expect((result) => {
        expect(result.body.data).toEqual(
          expect.arrayContaining(operations.map(op => 
            expect.objectContaining({
              status: op.status,
              name: op.name,
              id: op.id
            })
          ))
        );
        expect(result.body.total).toEqual(3);
        expect(result.body.page).toEqual(1);
      });
  });

  it('GET /api/operation/:id', async () => {
    const operation = await repo.findOne();

    await request(app.getHttpServer())
      .get(`/operation/${operation.id}`)
      .expect(200)
      .expect({
        id: operation.id,
        name: operation.name,
        status: operation.status
      })
  });

  it('POST /api/operation', async () => {
    const expected = {
      name: 'test operation',
      status: OperationStatus.InProgress
    };

    await request(app.getHttpServer())
      .post(`/operation`)
      .send({ name: expected.name })
      .expect(201)
      .expect(async op => 
      {
        expect(op.body).toMatchObject(expected);

        const actual = await repo.findOne({
          where: {
            id: op.body.id
          }
        });

        expect(actual).toMatchObject(expected);
      })
  });
});
