import { Dialog, DialogTitle, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import ViewMode from './ViewMode';

const AppointmentDetailsDialog = ({ open, onClose, appointmentDetail }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            slotProps={{ paper: { sx: { width: 450, borderRadius: 2 } } }}
        >
            <DialogTitle component="div" sx={{ position: 'relative' }}>
                <Typography variant="h6">Appointment Details</Typography>
                <Typography variant="body2" color="text.secondary">
                    Appointment · {appointmentDetail.appointment.id}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 10, top: 10 }}>
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <ViewMode onClose={onClose} appointmentDetail={appointmentDetail} />
        </Dialog>
    );
};

export default AppointmentDetailsDialog;
