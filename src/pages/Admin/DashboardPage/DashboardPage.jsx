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
} from '@mui/material';
const stats = [
    {
        title: 'Total Appointments',
        value: '245',
        change: '+12% from last month',
        icon: <CalendarMonth />,
    },
    {
        title: 'Total Pets',
        value: '1,324',
        change: '+8% from last month',
        icon: <Pets />,
    },
    {
        title: 'Total Revenue',
        value: '$24,563',
        change: '+18% from last month',
        icon: <AttachMoney />,
    },
    {
        title: 'Active Users',
        value: '573',
        change: '+4% from last month',
        icon: <Group />,
    },
];

const appointmentData = [
    {
        customer: 'John Doe',
        pet: 'Max (Dog)',
        time: 'Today, 10:00 AM',
        service: 'Vaccination',
        status: 'COMPLETED',
    },
    {
        customer: 'Jane Smith',
        pet: 'Luna (Cat)',
        time: 'Today, 11:30 AM',
        service: 'Grooming',
        status: 'IN_PROGRESS',
    },
    {
        customer: 'Robert Johnson',
        pet: 'Buddy (Dog)',
        time: 'Today, 2:00 PM',
        service: 'Check-up',
        status: 'PENDING',
    },
    {
        customer: 'Emily Davis',
        pet: 'Coco (Cat)',
        time: 'Tomorrow, 9:30 AM',
        service: 'Dental Cleaning',
        status: 'COMPLETED',
    },
    {
        customer: 'Michael Wilson',
        pet: 'Rocky (Dog)',
        time: 'Tomorrow, 3:00 PM',
        service: 'Vaccination',
        status: 'COMPLETED',
    },
];

const orderData = [
    {
        id: '#ORD-001',
        customer: 'John Doe',
        amount: '$120.50',
        status: 'PAID',
    },
    {
        id: '#ORD-002',
        customer: 'Jane Smith',
        amount: '$85.25',
        status: 'PENDING',
    },
    {
        id: '#ORD-003',
        customer: 'Robert Johnson',
        amount: '$210.75',
        status: 'COMPLETED',
    },
    {
        id: '#ORD-004',
        customer: 'Emily Davis',
        amount: '$45.00',
        status: 'PAID',
    },
    {
        id: '#ORD-005',
        customer: 'Michael Wilson',
        amount: '$150.30',
        status: 'PENDING',
    },
];

const statusColors = {
    PENDING: 'info',
    IN_PROGRESS: 'warning',
    PAID: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'error',
};

const statusLabels = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    PAID: 'Paid',
    COMPLETED: 'Completed',
    CANCELLED: 'Canceled',
};

const DashboardPage = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Grid2 container spacing={4}>
                {stats.map((item, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
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
                                <Typography variant="body2" color="text.secondary">
                                    {item.change}
                                </Typography>
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
                                    <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>
                                        View All
                                    </Button>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Date & Time</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Staff</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {appointmentData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.customer}</TableCell>
                                                <TableCell>{item.time}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell>{item.staff}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={statusLabels[item.status]}
                                                        sx={{
                                                            bgcolor: `${statusColors[item.status]}.main`,
                                                            color: `${statusColors[item.status]}.contrastText`,
                                                        }}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
                                    <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>
                                        View All
                                    </Button>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.customer}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={statusLabels[item.status]}
                                                        sx={{
                                                            bgcolor: `${statusColors[item.status]}.main`,
                                                            color: `${statusColors[item.status]}.contrastText`,
                                                        }}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
