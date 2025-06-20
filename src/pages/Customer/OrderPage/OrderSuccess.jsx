import { Box, Typography, Card, CardContent, Grid2, Divider, Stack, ListItem, Button, List } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import {
    AccessTime,
    ArrowBack,
    CalendarMonthOutlined,
    Email,
    LocationOn,
    Person,
    Phone,
    ReportProblem,
    VerifiedUser,
} from '@mui/icons-material';
import { useAuth } from '@src/hooks/useAuth';
import { formatFullDate, formatTimeWithAMPM } from '@src/utils/formatters';
import { useBranch } from '@src/hooks/useBranch';

const OrderSuccess = () => {
    const { userInfo } = useAuth();
    const { branches } = useBranch();

    const location = useLocation();
    const { data, variables: orderData, selectedProducts, total } = location.state || {};

    console.log(data, orderData, selectedProducts, total);

    return (
        <Box sx={{ p: 3, background: 'linear-gradient(to bottom right, #f0fdf4 , #d1fae5)', minHeight: '100vh' }}>
            <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                        Order Placed Successfully!
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        Thank you for shopping with us!
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
                            Order ID: ORD#{data.order_id}
                        </Typography>
                    </Box>
                </Box>

                {/* Order Details */}
                <Card sx={{ width: 1 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <ShoppingBag strokeWidth={2.5} style={{ color: '#ff7300' }} />
                            <Typography variant="h6" fontWeight="bold">
                                Order Details
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Grid2 container sx={{ justifyContent: 'space-between', px: 6, pt: 1 }}>
                            <Grid2>
                                <InfoRow icon={<Person />} label="Customer" value={userInfo.name} />
                                <InfoRow icon={<Phone />} label="Phone" value={userInfo.phone || 'Not provided'} />
                                <InfoRow icon={<Email />} label="Email" value={userInfo.email} />
                            </Grid2>

                            <Grid2>
                                <InfoRow
                                    icon={<CalendarMonthOutlined />}
                                    label="Order Date"
                                    value={formatFullDate(orderData.pickup_time)}
                                />
                                <InfoRow
                                    icon={<AccessTime />}
                                    label="Order Time"
                                    value={formatTimeWithAMPM(orderData.pickup_time)}
                                />
                                <InfoRow
                                    icon={<LocationOn />}
                                    label="Address"
                                    value={branches.find((b) => b.id === orderData.branch_id).location}
                                />
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>

                {/* Selected Products */}
                <Card sx={{ p: 2, width: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Ordered Products
                    </Typography>
                    {selectedProducts.map((item, index) => (
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
                            Order Policies & Terms
                        </Typography>
                    </Box>

                    <Grid2 container spacing={1} pl={4}>
                        {/* Order Cancellation Policy */}
                        <Grid2>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ReportProblem fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                                <Typography fontWeight="bold" color="warning">
                                    Pickup & Cancellation Policy
                                </Typography>
                            </Box>
                            <List dense sx={{ pl: 3, '& .MuiListItem-root': { fontSize: '13px', p: 0 } }}>
                                <ListItem disableGutters>• Please pick up your order at the selected time</ListItem>
                                <ListItem disableGutters>
                                    • Orders not collected within 2 hours after the pickup time will be automatically
                                    canceled
                                </ListItem>
                                <ListItem disableGutters>
                                    • Contact us in advance if you’re unable to arrive on time
                                </ListItem>
                            </List>
                        </Grid2>

                        {/* Quality Guarantee */}
                        <Grid2>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <VerifiedUser fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                                <Typography fontWeight="bold" color="success">
                                    Quality Guarantee
                                </Typography>
                            </Box>
                            <List dense sx={{ pl: 3, '& .MuiListItem-root': { fontSize: '13px', p: 0 } }}>
                                <ListItem disableGutters>
                                    • All products are 100% authentic and freshly prepared
                                </ListItem>
                                <ListItem disableGutters>• Secure packaging ensures no damage during handling</ListItem>
                                <ListItem disableGutters>• We stand by a 100% satisfaction guarantee</ListItem>
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
                        to="/product"
                        color="common"
                        variant="outlined"
                        sx={{ textTransform: 'none', bgcolor: 'common.contrastText' }}
                        startIcon={<ShoppingBag size={18} />}
                    >
                        Make Another Order
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

export default OrderSuccess;
