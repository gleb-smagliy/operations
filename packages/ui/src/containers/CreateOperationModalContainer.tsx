import { useState,  } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { OperationCreateDto } from '@operations/api.client';
import { useCreateOperationMutation } from '../services/operations';
import { CreateOperationForm } from './CreateOperationForm';

interface CreateOperationModalContainerProps {
    onCreated: () => any
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);
  

export function CreateOperationModalContainer({
    onCreated
}: CreateOperationModalContainerProps) {
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const [createOperation, { isLoading: isCreating, error }] = useCreateOperationMutation();

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const handleSubmit = (operation: OperationCreateDto) => createOperation(operation)
        .then(() => {
            handleClose();
            onCreated();
        });

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create operation</h2>
          <CreateOperationForm
            operation={{ name: '' }} 
            hasError={!!error}
            loading={isCreating}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      );

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </>

    );
}