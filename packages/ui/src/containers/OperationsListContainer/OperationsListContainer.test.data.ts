
import { GetManyOperationResponseDto } from '@operations/api.client';

export const baseResponse: GetManyOperationResponseDto = {
  count: 3,
  total: 3,
  data: [
    { name: 'operationsResponse1', id: 'op_id_1', status: 'Done' },
    { name: 'operationsResponse2', id: 'op_id_2', status: 'Failed' },
    { name: 'operationsResponse3', id: 'op_id_3', status: 'InProgress' },
  ],
  page: 1,
  pageCount: 1  
};

export const pagination = {
  page1: {
    data: {
        count: 5,
        total: 7,
        data: [
          { name: 'page1_operationsResponse1', id: 'op_id_1', status: 'Done' },
          { name: 'page1_operationsResponse2', id: 'op_id_2', status: 'Failed' },
          { name: 'page1_operationsResponse3', id: 'op_id_3', status: 'InProgress' },
          { name: 'page1_operationsResponse4', id: 'op_id_4', status: 'InProgress' },
          { name: 'page1_operationsResponse5', id: 'op_id_5', status: 'InProgress' }
        ],
        page: 1,
        pageCount: 2
      }
  },
  page2: {
    data: {
      count: 2,
      total: 7,
      data: [
        { name: 'page2_operationsResponse1', id: 'op_id_1', status: 'Done' },
        { name: 'page2_operationsResponse2', id: 'op_id_2', status: 'Failed' },
      ],
      page: 2,
      pageCount: 2
    }
  }
};

export const polling = {
  inProgress: {
    data: {
      count: 1,
      total: 1,
      data: [
        { name: 'operationsResponse1', id: 'op_id_1', status: 'InProgress' },
      ],
      page: 1,
      pageCount: 1
    }
  },
  done: {
    data: {
      count: 1,
      total: 1,
      data: [
        { name: 'operationsResponse1', id: 'op_id_1', status: 'Done' },
      ],
      page: 1,
      pageCount: 1
    }
  }
}