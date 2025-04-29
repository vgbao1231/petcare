import {
    Autorenew,
    CalendarTodayOutlined,
    KeyboardArrowDown,
    LocalAtmOutlined,
    LocalShippingOutlined,
    PaymentOutlined,
    ShoppingBagOutlined,
    Storefront,
    TaskAltOutlined,
} from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Chip, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
// Định nghĩa màu trạng thái
// const statusColors = {
//     Processing: {
//         color: '#0284c7',
//         bgcolor: '#e0f2fe',
//     },
//     'Out for Delivery': {
//         color: '#9333ea',
//         bgcolor: '#f3e8ff',
//     },
//     Delivered: {
//         color: '#22c55e',
//         bgcolor: '#dcfce7',
//     },
//     Cancelled: {
//         color: '#ef4444',
//         bgcolor: '#fee2e2',
//     },
// };
const statusColors = {
    Processing: 'info',
    'Out for Delivery': 'warning',
    Delivered: 'success',
    Cancelled: 'error',
};

const OrderCard = ({ id, dateTime, status, items, note, deliveredOn, method, summary }) => {
    const [open, setOpen] = useState(false);

    const itemNames = items.slice(0, 2).map((item) => {
        return `${item.name}${item.quantity > 1 ? ` x${item.quantity}` : ''}`;
    });

    if (items.length > 2) {
        itemNames.push('...');
    }

    return (
        <Box
            sx={{
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
                py: 2,
                px: 3,
            }}
        >
            {/* Header Card */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography fontSize={18} fontWeight={700}>
                            Order #{id}
                        </Typography>
                        <Chip
                            label={status}
                            size="small"
                            variant="outlined"
                            sx={{ bgcolor: `${statusColors[status]}.bgcolor`, color: `${statusColors[status]}.main` }}
                        />
                    </Box>
                    <Typography fontSize={14} color="text.secondary">
                        <CalendarTodayOutlined sx={{ fontSize: 12, verticalAlign: 'text-top', mr: 0.5 }} />
                        {`Placed on ${new Date(dateTime).toISOString().slice(0, 10)} at ${new Date(
                            dateTime
                        ).toLocaleTimeString('vi-VN', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                        })}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography fontWeight={500}>${summary.total}</Typography>
                    <Typography fontSize={13} color="text.secondary">
                        {items.length} items
                    </Typography>
                </Box>
                <Button
                    color="common"
                    sx={{ textTransform: 'none' }}
                    startIcon={<KeyboardArrowDown sx={{ transition: '0.3s', transform: open && 'rotate(180deg)' }} />}
                    onClick={() => setOpen(!open)}
                >
                    {open ? 'Less Details' : 'More Details'}
                </Button>
            </Box>

            {/* Card Content */}
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
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
                <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={500}>{itemNames.join(', ')}</Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <TaskAltOutlined fontSize="small" sx={{ color: 'success.light' }} />
                        <Typography variant="body2" color="text.secondary">
                            Delivered on {deliveredOn}
                        </Typography>
                    </Stack>
                </Box>
                <Button
                    variant="outlined"
                    color="common"
                    startIcon={<Autorenew />}
                    sx={{ textTransform: 'none', borderColor: 'divider' }}
                >
                    Reorder
                </Button>
            </Box>

            {/* Card Details */}
            <Collapse in={open}>
                <Divider sx={{ my: 2 }} />
                <Typography fontWeight={500} fontSize={18} mb={1}>
                    <ShoppingBagOutlined sx={{ fontSize: 24, color: 'primary.main', verticalAlign: 'top', mr: 1 }} />
                    Order Items
                </Typography>

                <Stack spacing={2} sx={{ mb: 2 }}>
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 2,
                                p: 1.5,
                                gap: 3,
                            }}
                        >
                            {/* Image */}
                            <CardMedia
                                component="img"
                                image={item.image}
                                sx={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 1,
                                    bgcolor: '#f5f5f5',
                                }}
                            />

                            {/* Product Info */}
                            <CardContent sx={{ flex: 1, p: 0 }}>
                                <Typography variant="subtitle1" fontWeight={500}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Qty: {item.quantity} &nbsp; ${item.price} each
                                </Typography>
                                <Typography fontWeight={500}>${item.price * item.quantity}</Typography>
                            </CardContent>

                            {/* Review Button */}
                            {status === 'Delivered' && (
                                <Button variant="outlined" size="small">
                                    Review
                                </Button>
                            )}
                        </Card>
                    ))}
                </Stack>

                <Box sx={{ display: 'flex', gap: 6 }}>
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Box>
                            <Typography fontWeight={500} fontSize={18} mb={1}>
                                <PaymentOutlined
                                    sx={{ fontSize: 24, color: 'primary.main', verticalAlign: 'top', mr: 1 }}
                                />
                                Order Summary & Payment
                            </Typography>
                            <Box sx={{ pl: 4 }}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Subtotal</Typography>
                                    <Typography>${summary.subtotal}</Typography>
                                </Stack>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography fontWeight={500}>Total</Typography>
                                    <Typography fontWeight={500}>${summary.total}</Typography>
                                </Stack>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'primary.bgcolor',
                                            p: 1,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 1,
                                        }}
                                    >
                                        <LocalAtmOutlined color="primary" fontSize="small" />
                                    </Box>
                                    <Typography>Payment Method: {method}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={500} fontSize={18} mb={1}>
                            <LocalShippingOutlined
                                sx={{ fontSize: 24, color: 'primary.main', verticalAlign: 'top', mr: 1 }}
                            />
                            Delivery Information
                        </Typography>
                        <Box sx={{ pl: 4 }}>
                            {note && (
                                <>
                                    <Typography variant="body2" fontWeight={500}>
                                        Delivery Note
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {note}
                                    </Typography>
                                </>
                            )}
                            {deliveredOn && (
                                <>
                                    <Typography variant="body2" fontWeight={500} mt={2}>
                                        Delivered On
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {deliveredOn}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
};

export default OrderCard;
