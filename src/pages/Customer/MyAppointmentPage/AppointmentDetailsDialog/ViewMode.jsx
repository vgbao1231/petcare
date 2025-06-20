import { Typography, Divider, Box, Stack, DialogContent, DialogActions, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useBranch } from '@src/hooks/useBranch';
import { ISOtoLocale } from '@src/utils/formatters';
import { appointmentServices } from '@services/appointmentServices';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmDialog from '@ui/ConfirmDialog/ConfirmDialog';
import { useState } from 'react';

const ViewMode = ({ onClose, appointmentDetail }) => {
    const { customer_address, scheduled_time, branch_id, note, id, status } = appointmentDetail.appointment;
    console.log(appointmentDetail.appointment);

    const { branches } = useBranch();
    const branch = branches.find((b) => b.id == branch_id) || {};
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: cancelAppointment } = useMutation({
        mutationFn: appointmentServices.cancelAppointment,
        onError: () => toast.error('Failed to cancel appoinment'),
        onSuccess: () => {
            toast.success('Cancel appoinment successfully');
            queryClient.invalidateQueries(['myAppointments']);
        },
    });

    return (
        <>
            <DialogContent sx={{ maxHeight: 420, overflowY: 'auto', pb: 0 }}>
                <Typography variant="body2" fontWeight={500}>
                    Appointment Type
                </Typography>
                <Typography mb={1}> {branch_id === 0 ? 'In-Store Visit' : 'At-Home Visit'}</Typography>
                <Typography variant="body2" fontWeight={500}>
                    Date & Time
                </Typography>
                <Typography mb={1}>{ISOtoLocale(scheduled_time)}</Typography>
                <Typography variant="body2" fontWeight={500}>
                    Location
                </Typography>
                {branch_id === 0 ? (
                    <Typography variant="body2">{customer_address}</Typography>
                ) : (
                    <>
                        <Typography>{branch.name}</Typography>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            {branch.location}
                        </Typography>
                    </>
                )}
                <Divider sx={{ my: 1 }} />
                {appointmentDetail.details.length > 0 && (
                    <Stack spacing={0.5} mb={1}>
                        <Typography variant="body2" fontWeight={500}>
                            Services
                        </Typography>
                        {appointmentDetail.details.map((ad, index) => (
                            <Box key={index} display="flex" justifyContent="space-between">
                                <Typography variant="body2">
                                    {ad.service_name} x {ad.quantity}
                                </Typography>
                                <Typography variant="body2">${ad.service_price * ad.quantity}</Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <Box display="flex" justifyContent="space-between">
                            <Typography fontWeight={500}>Total</Typography>
                            <Typography fontWeight={500}>${appointmentDetail.appointment?.total}</Typography>
                        </Box>
                    </Stack>
                )}
                {appointmentDetail.order?.length > 0 && (
                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={500}>
                            Products
                        </Typography>
                        {appointmentDetail.order?.items.map((p, index) => (
                            <Box key={index} display="flex" justifyContent="space-between">
                                <Typography variant="body2">
                                    {p.product_name} x {p.quantity}
                                </Typography>
                                <Typography variant="body2">${p.unit_price * p.quantity}</Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <Box display="flex" justifyContent="space-between">
                            <Typography fontWeight={500}>Total</Typography>
                            <Typography fontWeight={500}>${appointmentDetail.order?.total_price}</Typography>
                        </Box>
                    </Stack>
                )}
                <Box my={1}>
                    <Typography variant="body2" fontWeight={500}>
                        Staff
                    </Typography>
                    <Typography>
                        {appointmentDetail.appointment.employee_id === 0
                            ? 'Waiting for assignment'
                            : appointmentDetail.appointment.employee_id}
                    </Typography>
                    {/* <Box display="flex" alignItems="center" gap={2}>
                        <Avatar>
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography>Dr. Michael Chen</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Veterinarian
                            </Typography>
                        </Box>
                    </Box> */}
                </Box>
                {note && (
                    <Typography variant="body2" fontWeight={500}>
                        Notes
                    </Typography>
                )}
                <Typography variant="body2">{note}</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'end' }}>
                {status !== 'CANCELLED' && (
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Close />}
                        sx={{ textTransform: 'none' }}
                        onClick={() => setOpenConfirmDialog(true)}
                    >
                        Cancel Appointment
                    </Button>
                )}
            </DialogActions>
            {status !== 'CANCELLED' && (
                <ConfirmDialog
                    open={openConfirmDialog}
                    onClose={() => {
                        setOpenConfirmDialog(false);
                        onClose();
                    }}
                    onConfirm={() => {
                        cancelAppointment(id);
                        onClose();
                    }}
                    title="Cancel appointment?"
                    description="Do you really want to cancel this appointment? This action cannot be undone."
                />
            )}
        </>
    );
};

export default ViewMode;
