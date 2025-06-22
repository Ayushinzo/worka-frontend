import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const DialogBox = ({ open, handleClose, title, message }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title || "Notice"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message || "This is a popup message."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;