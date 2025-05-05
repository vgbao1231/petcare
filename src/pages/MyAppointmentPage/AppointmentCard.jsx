import { AccessTime, Cancel, LocationOn, Storefront, Visibility } from '@mui/icons-material';
import { Avatar, Box, Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import AppointmentDetailsDialog from './AppointmentDetailsDialog/AppointmentDetailsDialog';
import { useBranch } from '@src/hooks/useBranch';
import { appointmentServices } from '@services/appointmentServices';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import ConfirmDialog from '@ui/ConfirmDialog/ConfirmDialog';

//   UNSPECIFIED = 0;
//   PENDING = 4;       // Đã đặt
//   IN_PROGRESS = 1;   // Đang thực hiện
//   COMPLETED = 2;     // Hoàn thành
//   CANCELLED = 3;     // Đã hủy

const statusColors = {
    PENDING: 'info',
    IN_PROGRESS: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'error',
};

const statusLabels = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Canceled',
};

const AppointmentCard = ({ appointment }) => {
    const { customer_address, scheduled_time, status, branch_id, id, employee_id } = appointment;
    const [appointmentDetail, setAppointmentDetail] = useState({ appointment: {}, details: [] });
    const [open, setOpen] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const { branches } = useBranch();

    const { mutate: getAppointmentDetail } = useMutation({
        mutationFn: appointmentServices.getAppointmentDetail,
        onError: () => toast.error('Failed to fetch appoinment detail'),
        onSuccess: (data) => setAppointmentDetail(data),
    });

    const { mutate: cancelAppointment } = useMutation({
        mutationFn: appointmentServices.cancelAppointment,
        onError: () => toast.error('Failed to cancel appoinment'),
        onSuccess: () => toast.success('Cancel appoinment successfully'),
    });

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                borderLeft: 5,
                borderColor: `${statusColors[status]}.main`,
            }}
        >
            {/* Icon */}
            <Box
                sx={{
                    bgcolor: `${statusColors[status]}.bgcolor`,
                    p: 1,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                }}
            >
                <Storefront sx={{ color: `${statusColors[status]}.main`, fontSize: 24 }} />
            </Box>

            {/* Thông tin chính */}
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', mb: 1, gap: 2 }}>
                    <Typography fontWeight={700}>{branch_id === 0 ? 'In-Store Visit' : 'At-Home Visit'}</Typography>
                    <Chip
                        label={statusLabels[status]}
                        size="small"
                        variant="outlined"
                        sx={{
                            bgcolor: `${statusColors[status]}.bgcolor`,
                            color: `${statusColors[status]}.main`,
                            borderColor: `${statusColors[status]}.main`,
                        }}
                    />
                </Box>

                <Typography fontSize={12} color="text.secondary">
                    <AccessTime sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                    {new Date(scheduled_time).toLocaleString('vi-VN')}
                </Typography>

                <Typography fontSize={12} color="text.secondary">
                    <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                    {customer_address || branches.find((b) => b.id === branch_id)?.location}
                </Typography>
            </Box>

            <Box sx={{ alignSelf: 'end' }}>
                {/* Thông tin bác sĩ */}
                {employee_id !== 0 && (
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'right', gap: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                            Dr. Michael Chen
                        </Typography>
                        <Avatar alt="Avatar" src="/src/assets/gura.jpg" />
                    </Box>
                )}

                {/* Hành động */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ textTransform: 'none', py: 0.4 }}
                        startIcon={<Cancel fontSize="small" />}
                        onClick={() => setOpenConfirmDialog(true)}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ textTransform: 'none', py: 0.4 }}
                        startIcon={<Visibility fontSize="small" />}
                        onClick={() => {
                            setOpen(true);
                            getAppointmentDetail(id);
                        }}
                    >
                        Details
                    </Button>
                    <AppointmentDetailsDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        appointmentDetail={appointmentDetail}
                    />
                    <ConfirmDialog
                        open={openConfirmDialog}
                        onClose={() => setOpenConfirmDialog(false)}
                        onConfirm={() => cancelAppointment(id)}
                        title="Cancel appointment?"
                        description="Do you really want to cancel this appointment? This action cannot be undone."
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AppointmentCard;
