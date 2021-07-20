import { useState, useCallback, ChangeEvent } from 'react';
import { OperationCreateDto } from '@operations/api.client';
import { Error } from '../../components/Error';
import { useCreateOperationMutation } from '../../services/operations';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export interface OperationFormProps {
    onSubmit: () => any
    onCancel: () => any
}

const NAME_MAX_SIZE = 128;

export function CreateOperationForm({
    onSubmit,
    onCancel
}: OperationFormProps)
{
    const [operation, setOperation] = useState<OperationCreateDto>({ name: '' });
    const [createOperation, { isLoading, error }] = useCreateOperationMutation();

    const handleSubmit = () => createOperation(operation)
        .then(onSubmit);

    const changeName = useCallback(
        (ev: ChangeEvent<HTMLInputElement>) => ev.target.value.length < NAME_MAX_SIZE && setOperation(() => ({ name: ev.target.value })
    ),
    [setOperation]);

    return (
        <>
            <form noValidate autoComplete="off">
                <TextField
                    label="Name"
                    aria-label="operation name"
                    value={operation.name}
                    onChange={changeName}
                    fullWidth
                />
                {error && <Error error="Something went wrong"/>}
            </form>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Button
                    aria-label="cancel creation"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    aria-label="create operation"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isLoading || operation.name.length == 0}
                >
                    Create
                </Button>
            </Grid>
        </>
    )
}