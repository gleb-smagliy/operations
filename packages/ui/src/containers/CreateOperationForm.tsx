import { useState, useCallback, ChangeEvent } from 'react';
import { OperationCreateDto } from '@operations/api.client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface OperationFormProps {
    operation: OperationCreateDto
    onSubmit: (operation: OperationCreateDto) => any
    onCancel: () => any
    hasError: boolean
    loading: boolean
}

const NAME_MAX_SIZE = 128;

export function CreateOperationForm({
    operation,
    onSubmit,
    onCancel,
    loading,
    hasError
}: OperationFormProps)
{
    const [editedOperation, setEditedOperation] = useState(operation);
    const changeName = useCallback(
        (ev: ChangeEvent<HTMLInputElement>) => ev.target.value.length < NAME_MAX_SIZE && setEditedOperation(() => ({ name: ev.target.value })
    ),
    [setEditedOperation]);

    const submit = () => onSubmit(editedOperation);

    return (
        <>
            <form noValidate autoComplete="off">
                <TextField
                    label="Name"
                    aria-label="operation name"
                    value={editedOperation.name}
                    onChange={changeName}
                />
                {hasError && 'Something went wrong'}
            </form>
            <Button onClick={onCancel}>
                Cancel
            </Button>
            <Button color="primary" onClick={submit} disabled={loading || editedOperation.name.length == 0}>
                Create
            </Button>
        </>
    )
}