
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { OperationsListContainer } from './OperationsListContainer';
import { operationsApi } from '../../services/operations';
import { api } from '../../services/api';
import {
  baseResponse,
  pagination,
  polling
} from './OperationsListContainer.test.data';

jest.mock('../../services/api', () => ({
  api: {
    operation: {
      getManyOperations: jest.fn()
    }
  }
}));

describe('<OperationsListContainer />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should render all operations on a page', async () => {
    (api.operation.getManyOperations as jest.Mock).mockResolvedValue({ data: baseResponse });

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const taskInProgress = await screen.findByText(/InProgress/i);
    const taskDone = await screen.findByText(/Done/i);
    const taskFailed = await screen.findByText(/Failed/i);
    const nextPage = await screen.findByLabelText(/Next page/);

    expect(taskInProgress).toBeInTheDocument();
    expect(taskDone).toBeInTheDocument();
    expect(taskFailed).toBeInTheDocument();
    expect(nextPage).toBeDisabled();
  });

  it('should render error when something goes wrong', async () => {
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => {});
    (api.operation.getManyOperations as jest.Mock).mockRejectedValue({ error: 'some error' });

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const error = await screen.findByText(/Something went wrong/i);

    expect(error).toBeInTheDocument();
  });

  it('should render loading when waiting for a response', () => {
    (api.operation.getManyOperations as jest.Mock).mockRejectedValue({ error: 'some error' });

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const loading = screen.getByText(/Loading.../i);

    expect(loading).toBeInTheDocument();
  });

  it('should render a single item with a title and a status', async () => {
    (api.operation.getManyOperations as jest.Mock).mockResolvedValue({
      data: baseResponse
    });

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const operation = baseResponse.data[0];

    const item = await screen.findByText(operation.name);

    expect(item.parentElement).toMatchSnapshot();
  });

  it('should open a create modal when clicked on a create button', async () => {
    (api.operation.getManyOperations as jest.Mock).mockResolvedValue({
      data: baseResponse
    });

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    fireEvent(
      await screen.findByText('Create'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    expect(await screen.findByText(/Create operation/i)).toBeInTheDocument();
  });

  it('should render pagination button enabled when api returns more than 5 items', async () => {
    (api.operation.getManyOperations as jest.Mock).mockResolvedValue(pagination.page1);

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const cells = await screen.findAllByText(/operationsResponse/);
    const nextPage = await screen.findByLabelText(/Next page/);

    expect(nextPage).not.toBeDisabled();
    expect(cells).toHaveLength(5);
  });

  it('should request the next page', async () => {
    (api.operation.getManyOperations as jest.Mock)
      .mockResolvedValueOnce(pagination.page1)
      .mockResolvedValueOnce(pagination.page2);

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const page1Cells = await screen.findAllByText(/page1_/);

    fireEvent(
      await screen.findByLabelText(/Next page/),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    const page2Cells = await screen.findAllByText(/page2_/);

    expect(page1Cells).toHaveLength(5);
    expect(page2Cells).toHaveLength(2);
  });

  it('should poll for update when there some operation is in progress', async () => {
    jest.useFakeTimers();
    (api.operation.getManyOperations as jest.Mock)
      .mockResolvedValueOnce(polling.inProgress)
      .mockResolvedValueOnce(polling.done);

    render(
      <ApiProvider api={operationsApi}>
        <OperationsListContainer />
      </ApiProvider>
    );

    const inProgress = await screen.findByText(/InProgress/);
    jest.advanceTimersByTime(10000);
    const done = await screen.findByText(/Done/);

    expect(inProgress).toBeInTheDocument();
    expect(done).toBeInTheDocument();
  });
});
