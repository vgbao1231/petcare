import { AccessTime, Cancel, LocationOn, Storefront, Visibility } from '@mui/icons-material';
import { Avatar, Box, Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import AppointmentDetailsDialog from './AppointmentDetailsDialog/AppointmentDetailsDialog';
import { useBranch } from '@src/hooks/useBranch';

const statusColors = {
    pending: 'info',
    in_progress: 'warning',
    completed: 'success',
    cancelled: 'error',
};

const statusLabels = {
    pending: 'Upcoming',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Canceled',
};

const AppointmentCard = ({ appointment }) => {
    const { customer_address, scheduled_time, status, branch_id } = appointment;
    const [open, setOpen] = useState(false);
    const { branches } = useBranch();

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
                    <Typography fontWeight={700}>{statusLabels[status]}</Typography>
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

            <Box>
                {/* Thông tin bác sĩ */}
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'right', gap: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                        Dr. Michael Chen
                    </Typography>
                    <Avatar alt="Avatar" src="/src/assets/gura.jpg" />
                </Box>

                {/* Hành động */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ textTransform: 'none', py: 0.4 }}
                        startIcon={<Cancel fontSize="small" />}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ textTransform: 'none', py: 0.4 }}
                        startIcon={<Visibility fontSize="small" />}
                        onClick={() => setOpen(true)}
                    >
                        Details
                    </Button>
                    <AppointmentDetailsDialog open={open} onClose={() => setOpen(false)} appointment={appointment} />
                </Box>
            </Box>
        </Box>
    );
};

export default AppointmentCard;
