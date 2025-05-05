import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>
            <DialogContent sx={{ py: 0 }}>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button size="small" sx={{ textTransform: 'none' }} onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    size="small"
                    sx={{ textTransform: 'none' }}
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
