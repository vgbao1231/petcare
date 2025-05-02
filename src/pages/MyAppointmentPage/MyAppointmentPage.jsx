import { Box, Stack, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { useCallback, useMemo, useState } from 'react';
import AppointmentCard from './AppointmentCard';

const appointments = [
    {
        id: 'appt_001',
        customer_address: 'Downtown Branch',
        scheduled_time: '2023-07-20T10:00:00Z',
        status: 'pending',
        total: 114.95,
        note: 'Includes pet products and a basic check-up',
        branch_id: 'branch_001',
        employeee_id: 'emp_001',
    },
    {
        id: 'appt_002',
        customer_address: 'Uptown Clinic',
        scheduled_time: '2023-06-15T14:30:00Z',
        status: 'completed',
        total: 136.98,
        note: 'Cat food and vaccination service',
        branch_id: 'branch_002',
        employeee_id: 'emp_002',
    },
    {
        id: 'appt_003',
        customer_address: 'Main Street Vet',
        scheduled_time: '2023-08-05T09:00:00Z',
        status: 'pending',
        total: 61.98,
        note: 'Cat food order only',
        branch_id: 'branch_003',
        employeee_id: 'emp_003',
    },
    {
        id: 'appt_004',
        customer_address: 'City Pet Spa',
        scheduled_time: '2023-05-10T16:00:00Z',
        status: 'cancelled',
        total: 40.0,
        note: 'Grooming appointment canceled',
        branch_id: 'branch_004',
        employeee_id: 'emp_004',
    },
    {
        id: 'appt_005',
        customer_address: 'Downtown Branch',
        scheduled_time: '2023-09-12T11:15:00Z',
        status: 'in_progress',
        total: 89.97,
        note: 'Dog treats and teeth cleaning',
        branch_id: 'branch_001',
        employeee_id: 'emp_005',
    },
];

const MyAppointmentPage = () => {
    // const [currentTab, setCurrentTab] = useState(0);
    // const handleClick = useCallback((index) => setCurrentTab(index), []);
    // const { userInfo } = useAuth();

    // const { data: appointments = [] } = useQuery({
    //     queryKey: ['myAppointments', userInfo.userId],
    //     queryFn: () => appointmentServices.myAppointment(userInfo.userId),
    //     enabled: !!userInfo.userId, // chỉ gọi API nếu có userId
    // });

    // const filteredAppointments = useMemo(() => {
    //     if (currentTab === 0) return appointments.filter((a) => a.status === 'Upcoming');
    //     if (currentTab === 1) return appointments.filter((a) => a.status === 'Completed');
    //     if (currentTab === 2) return appointments.filter((a) => a.status === 'Canceled');
    //     return appointments; // All Appointments
    // }, [currentTab, appointments]);

    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = useCallback((index) => setCurrentTab(index), []);
    const filteredAppointments = useMemo(() => {
        if (currentTab === 0) return appointments.filter((a) => a.status === 'pending');
        if (currentTab === 1) return appointments.filter((a) => a.status === 'completed');
        if (currentTab === 2) return appointments.filter((a) => a.status === 'cancelled');
        return appointments; // All Appointments
    }, [currentTab]);

    console.log(filteredAppointments);

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
                {['Upcoming', 'Completed', 'Cancelled', 'All Appointments'].map((tab, index) => (
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
