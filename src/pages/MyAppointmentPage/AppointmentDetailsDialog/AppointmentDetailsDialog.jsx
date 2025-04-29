import { Dialog, DialogTitle, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import ViewMode from './ViewMode';
import { useState } from 'react';
import EditMode from './EditMode';

const AppointmentDetailsDialog = ({ open, onClose, appointment }) => {
    const [editMode, setEditMode] = useState(false);
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
                    APT-12345 · Upcoming
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 10, top: 10 }}>
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            {editMode ? (
                <EditMode setEditMode={setEditMode} appointment={appointment} />
            ) : (
                <ViewMode setEditMode={setEditMode} appointment={appointment} />
            )}
        </Dialog>
    );
};

export default AppointmentDetailsDialog;
