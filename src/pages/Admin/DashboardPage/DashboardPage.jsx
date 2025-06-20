import { AttachMoney, CalendarMonth, Group, Pets } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Grid2,
    Typography,
    Box,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    CircularProgress,
} from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import { orderServices } from '@services/orderServices';
import { paymentServices } from '@services/paymentServices';
import { petServices } from '@services/petServices';
import { userServices } from '@services/userServices';
import { useBranch } from '@src/hooks/useBranch';
import { formatCurrency, formatUnixToDateLocale } from '@src/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const statusColors = {
    4: 'info',
    1: 'warning',
    2: 'success',
    3: 'error',
};

const statusLabels = {
    4: 'Pending',
    1: 'In Progress',
    2: 'Completed',
    3: 'Canceled',
};

const DashboardPage = () => {
    const { branches } = useBranch();
    const { data: appointment, isLoading: isAppointmentLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => appointmentServices.getAllAppointments(),
        keepPreviousData: true,
    });

    const { data: order, isLoading: isOrderLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: () => orderServices.getAllOrders(),
        keepPreviousData: true,
    });

    const { data: petCount } = useQuery({
        queryKey: ['petCount'],
        queryFn: petServices.getPetCount,
    });

    const { data: userCount } = useQuery({
        queryKey: ['userCount'],
        queryFn: userServices.getUserCount,
    });

    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth - 1;

    const { data: currentRevenue } = useQuery({
        queryKey: ['revenue', currentMonth],
        queryFn: () => paymentServices.getRevenue(currentMonth),
    });

    const { data: previousRevenue } = useQuery({
        queryKey: ['revenue', previousMonth],
        queryFn: () => paymentServices.getRevenue(previousMonth),
    });

    const calculateChange = (current, previous) => {
        if (previous === null || previous === undefined || current === null || current === undefined) {
            return '0%';
        }
        if (previous === 0) {
            return current === 0 ? '0%' : '+∞%';
        }

        const diff = ((current - previous) / previous) * 100;
        const sign = diff >= 0 ? '+' : '';
        return `${sign}${diff.toFixed(1)}%`;
    };

    const revenueChange =
        currentRevenue && previousRevenue
            ? calculateChange(currentRevenue.total_revenue, previousRevenue.total_revenue)
            : '...';

    const stats = [
        {
            title: 'Total Appointments',
            value: appointment?.length ?? '...',
            icon: <CalendarMonth />,
        },
        {
            title: 'Total Pets',
            value: petCount?.total_pets ?? '...',
            icon: <Pets />,
        },
        {
            title: 'Total Revenue',
            value:
                typeof currentRevenue?.total_revenue === 'number'
                    ? formatCurrency(currentRevenue.total_revenue)
                    : '...',
            change: revenueChange,
            icon: <AttachMoney />,
        },
        {
            title: 'Active Users',
            value: userCount?.count ?? '...',
            icon: <Group />,
        },
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Grid2 container spacing={4}>
                {stats.map((item, index) => (
                    <Grid2 size={3} key={index}>
                        <Card
                            variant="outlined"
                            sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {item.title}
                                    </Typography>
                                    {item.icon}
                                </Box>
                                <Typography variant="h5" fontWeight="bold">
                                    {item.value}
                                </Typography>
                                {item.change && (
                                    <Typography variant="body2" color="text.secondary">
                                        {item.change} from last month
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

            {/* Table */}
            <Box sx={{ pt: 4 }}>
                <Grid2 container spacing={4}>
                    {/* Appointments */}
                    <Grid2 size={{ xs: 12, md: 7 }}>
                        <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Recent Appointments
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/appointments"
                                        size="small"
                                        variant="outlined"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        View All
                                    </Button>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Customer</TableCell>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center">Address</TableCell>
                                            <TableCell align="center">Staff</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {isAppointmentLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">
                                                    <CircularProgress size={24} />
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            (appointment || []).slice(0, 6).map((item, index) => {
                                                const appointment = item.appointment;
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">{item.customer_name}</TableCell>
                                                        <TableCell align="center">
                                                            {formatUnixToDateLocale(appointment.scheduled_time.seconds)}
                                                        </TableCell>
                                                        {appointment.customer_address ? (
                                                            <TableCell align="center">
                                                                {appointment.customer_address}
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell align="center">
                                                                <Typography>
                                                                    {
                                                                        branches.find(
                                                                            (b) => b.id === appointment.branch_id
                                                                        )?.name
                                                                    }
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {
                                                                        branches.find(
                                                                            (b) => b.id === appointment.branch_id
                                                                        )?.location
                                                                    }
                                                                </Typography>
                                                            </TableCell>
                                                        )}
                                                        <TableCell align="center">{item.employee_name}</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                variant="outlined"
                                                                label={statusLabels[appointment.status]}
                                                                color={statusColors[appointment.status]}
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid2>

                    {/* Orders */}
                    <Grid2 size={{ xs: 12, md: 5 }}>
                        <Card sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }} elevation={0}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Recent Orders
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/orders"
                                        size="small"
                                        variant="outlined"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        View All
                                    </Button>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Order ID</TableCell>
                                            <TableCell align="center">Customer</TableCell>
                                            <TableCell align="center">Amount</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {isOrderLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center" sx={{ p: 4 }}>
                                                    <CircularProgress />
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            (order || []).slice(0, 8).map((item, index) => {
                                                const order = item.order;
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">{order.id}</TableCell>
                                                        <TableCell align="center">{item.customer_name}</TableCell>
                                                        <TableCell align="center">
                                                            {formatCurrency(order.total_price)}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={statusLabels[order.status]}
                                                                color={statusColors[order.status]}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default DashboardPage;
