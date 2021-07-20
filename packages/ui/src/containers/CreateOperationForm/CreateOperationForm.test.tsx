import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { operationsApi } from '../../services/operations';
import { api } from '../../services/api';
import { CreateOperationForm } from './CreateOperationForm';

jest.mock('../../services/api', () => ({
  api: {
    operation: {
      createOneOperation: jest.fn()
    }
  }
}));

describe('<CreateOperationForm />', () => {
  // in list check modal opening

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should submit operation', async () => {
    const name = 'New operation 123';
    const onSubmit = jest.fn();
    (api.operation.createOneOperation as jest.Mock).mockResolvedValue({ id: '123' });

    render(
      <ApiProvider api={operationsApi}>
        <CreateOperationForm
          onSubmit={onSubmit}
          onCancel={jest.fn()}
        />
      </ApiProvider>
    );

    fireEvent.change(
      within(screen.getByLabelText('operation name')).getByRole('textbox'),
      { target: { value: name } }
    );

    fireEvent(
      screen.getByLabelText('create operation'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    // wait for all the async work to be finished
    await new Promise(setImmediate)

    expect(api.operation.createOneOperation).toHaveBeenCalledWith({ name });
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should disable submit by default', async () => {
    (api.operation.createOneOperation as jest.Mock).mockResolvedValue({ id: '123' });

    render(
      <ApiProvider api={operationsApi}>
        <CreateOperationForm
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      </ApiProvider>
    );

    const submit = screen.getByLabelText('create operation');
    expect(submit).toBeDisabled();
  });

  it('should call onCancel when cancel clicked', async () => {
    const onCancel = jest.fn();
    (api.operation.createOneOperation as jest.Mock).mockResolvedValue({ id: '123' });

    render(
      <ApiProvider api={operationsApi}>
        <CreateOperationForm
          onSubmit={jest.fn()}
          onCancel={onCancel}
        />
      </ApiProvider>
    );

    fireEvent(
      screen.getByLabelText('cancel creation'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onCancel).toHaveBeenCalled();
  });
});
