// components/ConfirmDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ConfirmDialog = ({ open, title, content, onClose, onConfirm, cancel, confirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="inherit">{cancel || "Cancel"}</Button>
      <Button onClick={onConfirm} color="error" variant="contained">{confirm || "Delete"}</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;