import { Box, Stack, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { useCallback, useMemo, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { appointmentServices } from '@services/appointmentServices';
import { useAuth } from '@src/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

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
