import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

export interface CreateOperationModalProps {
    onClose: () => any,
    submit: (form: { name: string }) => any,
    creating: boolean,
    error: string,
    opened: boolean
}

export function CreateOperationModal({
    // opened,
    // creating,
    // onClose,
    // error,
    // submit
}: CreateOperationModalProps) 
{
    // return (
    //     <Button variant="contained" color="primary" onClick={() => createOperation({ name: `new operation ${Math.random().toString().substring(3, 5)}` })}>
    //         Create
    //     </Button>
    // );

    return null;
}