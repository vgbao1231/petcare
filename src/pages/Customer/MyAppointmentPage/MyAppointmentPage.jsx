import { Box, Button, Stack, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { useCallback, useMemo, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { appointmentServices } from '@services/appointmentServices';
import { useAuth } from '@src/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { EventBusy } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MyAppointmentPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = useCallback((index) => setCurrentTab(index), []);
    const { userInfo } = useAuth();

    const { data: appointments = [] } = useQuery({
        queryKey: ['myAppointments', userInfo.userId],
        queryFn: () => appointmentServices.myAppointment(userInfo.userId),
        enabled: !!userInfo.userId, // chỉ gọi API nếu có userId
    });

    const filteredAppointments = useMemo(() => {
        if (currentTab === 0) return appointments.filter((a) => a.status === 'PENDING');
        if (currentTab === 1) return appointments.filter((a) => a.status === 'IN_PROGRESS');
        if (currentTab === 2) return appointments.filter((a) => a.status === 'COMPLETED');
        if (currentTab === 3) return appointments.filter((a) => a.status === 'CANCELLED');
        return appointments; // All Appointments
    }, [currentTab, appointments]);

    if (appointments.length === 0)
        return (
            <Box sx={{ pt: 12, px: 25, pb: 5, height: '100vh' }}>
                <Typography fontSize={24} fontWeight={600}>
                    My Appointments
                </Typography>

                <Box sx={{ ...centerSx, flexDirection: 'column', gap: 1.5, height: '50vh' }}>
                    <Box sx={{ ...centerSx, p: 2, bgcolor: '#f0f0f0', borderRadius: '50%' }}>
                        <EventBusy sx={{ fontSize: 50, color: '#78716c' }} />
                    </Box>

                    <Typography variant="h5" fontWeight={500}>
                        You have no appointments
                    </Typography>
                    <Typography color="text.secondary">
                        {"Looks like you haven't booked any appointments yet."}
                    </Typography>

                    <Button component={Link} to="/appointment" variant="contained" sx={{ textTransform: 'none' }}>
                        Book Appointment
                    </Button>
                </Box>
            </Box>
        );

    return (
        <Box
            sx={{
                pt: 12,
                px: 20,
                pb: 5,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography fontSize={24} fontWeight={500} mb={2}>
                My Appointments
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 0.6, borderRadius: 2, ...centerSx, gap: 2, alignSelf: 'start' }}>
                {['Pending', 'In Progress', 'Completed', 'Cancelled', 'All Appointments'].map((tab, index) => (
                    <Box
                        key={index}
                        sx={{
                            px: 2,
                            py: 0.5,
                            bgcolor: index === currentTab ? '#fff' : 'none',
                            borderRadius: 1,
                            cursor: 'pointer',
                            transition: '0.3s',
                            ':hover': {
                                bgcolor: index === currentTab ? 'none' : '#fafafa',
                            },
                        }}
                        onClick={() => handleClick(index)}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={index === currentTab ? 500 : undefined}
                            sx={{ color: index === currentTab ? undefined : 'text.secondary' }}
                        >
                            {tab}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Stack spacing={4} sx={{ px: 1, pt: 2, pb: 1, maxHeight: '100%', overflowY: 'auto' }}>
                {filteredAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </Stack>
        </Box>
    );
};

export default MyAppointmentPage;
