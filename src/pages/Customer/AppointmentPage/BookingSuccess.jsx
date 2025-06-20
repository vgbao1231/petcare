import { Box, Typography, Card, CardContent, Grid2, Divider, Stack, ListItem, Button, List } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useLocation } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import {
    AccessTime,
    ArrowBack,
    CalendarMonthOutlined,
    Email,
    LocalAtm,
    LocationOn,
    Person,
    Phone,
    ReportProblem,
    VerifiedUser,
} from '@mui/icons-material';
import { useAuth } from '@src/hooks/useAuth';
import { formatFullDate, formatTimeWithAMPM } from '@src/utils/formatters';
import { useBranch } from '@src/hooks/useBranch';

const BookingSuccess = () => {
    // const bookingData = {
    //     id: 'PET156362',
    //     petName: '123',
    //     owner: '123',
    //     phone: '0911095800',
    //     email: 'root@gmail.com',
    //     date: 'Thursday, June 26, 2025',
    //     time: '14:37',
    //     address: '12 Hà Thanh, Nha Trang, Khánh Hòa',
    // };

    // const bookingData = {
    //     customer_id: 15,
    //     customer_address: '13 Hà Thanh, Nha Trang, Khánh Hòa',
    //     note: '',
    //     scheduled_time: '2025-06-18T07:45:00.000Z',
    // };
    const { userInfo } = useAuth();
    const { branches } = useBranch();

    const location = useLocation();
    const { data, variables: bookingData, selectedServices, total } = location.state || {};
    console.log(data, bookingData, selectedServices, total);

    return (
        <Box sx={{ p: 3, background: 'linear-gradient(to bottom right, #f0fdf4 , #d1fae5)', minHeight: '100vh' }}>
            <Box sx={{ maxWidth: 680, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Header */}
                <Box
                    sx={{
                        textAlign: 'center',
                        background: 'linear-gradient(to right, #22c55e , #10b981)',
                        color: 'white',
                        borderRadius: 2,
                        p: 4,
                        width: 1,
                    }}
                >
                    <CheckCircleOutlineIcon sx={{ fontSize: 48 }} />
                    <Typography variant="h5" fontWeight="bold" mt={2}>
                        Booking Confirmed!
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        Thank you for choosing our pet care services
                    </Typography>
                    <Box
                        sx={{
                            mt: 2,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            display: 'inline-block',
                            px: 2.5,
                            py: 1,
                            borderRadius: 1,
                        }}
                    >
                        <Typography fontWeight="bold" sx={{ color: '#d3f9dc' }}>
                            Booking ID: APT#{data.appointment_id}
                        </Typography>
                    </Box>
                </Box>

                {/* Booking Details */}
                <Card sx={{ width: 1 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <PawPrint strokeWidth={2.5} style={{ color: '#ff7300' }} />
                            <Typography variant="h6" fontWeight="bold">
                                Booking Details
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Grid2 container sx={{ justifyContent: 'space-between', px: 6, pt: 1 }}>
                            <Grid2>
                                <InfoRow icon={<Person />} label="Owner" value={userInfo.name} />
                                <InfoRow icon={<Phone />} label="Phone" value={userInfo.phone || 'Not provided'} />
                                <InfoRow icon={<Email />} label="Email" value={userInfo.email} />
                            </Grid2>

                            <Grid2>
                                <InfoRow
                                    icon={<CalendarMonthOutlined />}
                                    label="Appointment Date"
                                    value={formatFullDate(bookingData.scheduled_time)}
                                />
                                <InfoRow
                                    icon={<AccessTime />}
                                    label="Appointment Time"
                                    value={formatTimeWithAMPM(bookingData.scheduled_time)}
                                />
                                <InfoRow
                                    icon={<LocationOn />}
                                    label="Address"
                                    value={
                                        bookingData.customer_address
                                            ? bookingData.customer_address
                                            : branches.find((b) => b.id === bookingData.branch_id).location
                                    }
                                />
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>

                {/* Selected Services */}
                <Card sx={{ p: 2, width: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Selected Services
                    </Typography>
                    {selectedServices.map((item, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            px={2}
                            py={0.5}
                            bgcolor="#f8f8f8"
                            my={0.5}
                            borderRadius={1}
                        >
                            <Typography>
                                {item.name} x {item.quantity}
                            </Typography>
                            <Typography>${item.price}</Typography>
                        </Box>
                    ))}
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between" px={2}>
                        <Typography fontWeight="bold">Total Cost:</Typography>
                        <Typography fontWeight="bold">${total}</Typography>
                    </Box>
                </Card>

                {/* Policies & Terms */}
                <Card sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <VerifiedUser sx={{ mr: 1, color: 'info.main' }} />
                        <Typography variant="h6" fontWeight="bold">
                            Service Policies & Terms
                        </Typography>
                    </Box>

                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTime fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
                                <Typography fontWeight="bold" color="info">
                                    Appointment Policy
                                </Typography>
                            </Box>
                            <List dense sx={{ pl: 3, '& .MuiListItem-root': { fontSize: '13px', p: 0 } }}>
                                <ListItem disableGutters>• Please arrive on time for your appointment</ListItem>
                                <ListItem disableGutters>• Notify us 2 hours in advance for changes</ListItem>
                                <ListItem disableGutters>• Services may take 1-3 hours depending on type</ListItem>
                            </List>
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ReportProblem fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                                <Typography fontWeight="bold" color="warning">
                                    Important Notes
                                </Typography>
                            </Box>
                            <List dense sx={{ pl: 3, '& .MuiListItem-root': { fontSize: '13px', p: 0 } }}>
                                <ListItem disableGutters>• Pets must be up-to-date on vaccinations</ListItem>
                                <ListItem disableGutters>• Please inform us of any health conditions</ListItem>
                                <ListItem disableGutters>• We are not liable for pre-existing conditions</ListItem>
                            </List>
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalAtm fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                                <Typography fontWeight="bold" color="success">
                                    Payment Policy
                                </Typography>
                            </Box>
                            <List dense sx={{ pl: 3, '& .MuiListItem-root': { fontSize: '13px', p: 0 } }}>
                                <ListItem disableGutters>• Payment due after service completion</ListItem>
                                <ListItem disableGutters>• We accept cash and card payments</ListItem>
                                <ListItem disableGutters>• Prices may vary based on pet condition</ListItem>
                            </List>
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <VerifiedUser fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                                <Typography fontWeight="bold" color="success">
                                    Quality Guarantee
                                </Typography>
                            </Box>
                            <List dense sx={{ pl: 3, '& .MuiListItem-root': { fontSize: '13px', p: 0 } }}>
                                <ListItem disableGutters>• Professional, experienced staff</ListItem>
                                <ListItem disableGutters>• High-quality, safe products only</ListItem>
                                <ListItem disableGutters>• 7-day service guarantee</ListItem>
                            </List>
                        </Grid2>
                    </Grid2>
                </Card>
                {/* Buttons */}
                <Box display="flex" justifyContent="center" mt={3} gap={4}>
                    <Button
                        component={Link}
                        to="/"
                        color="common"
                        variant="outlined"
                        sx={{ textTransform: 'none', bgcolor: 'common.contrastText' }}
                        startIcon={<ArrowBack fontSize="small" />}
                    >
                        Back to Home
                    </Button>
                    <Button
                        component={Link}
                        to="/appointment"
                        color="common"
                        variant="outlined"
                        sx={{ textTransform: 'none', bgcolor: 'common.contrastText' }}
                        startIcon={<CalendarMonthOutlined fontSize="small" />}
                    >
                        Booking Another
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 1.5 }}>
        <Box sx={{ mt: 0.5, color: 'primary.main' }}>{icon}</Box>
        <Box>
            <Typography variant="body2" fontWeight="bold">
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    </Stack>
);

export default BookingSuccess;
