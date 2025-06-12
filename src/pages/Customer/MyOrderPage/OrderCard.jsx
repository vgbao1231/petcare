import {
    CalendarTodayOutlined,
    KeyboardArrowDown,
    LocalShippingOutlined,
    PaymentOutlined,
    ShoppingBagOutlined,
    Storefront,
    TaskAltOutlined,
} from '@mui/icons-material';
import { Box, Button, Card, Chip, Collapse, Divider, Stack, Typography } from '@mui/material';
import { useBranch } from '@src/hooks/useBranch';
import { capitalizeWords, ISOtoLocale } from '@src/utils/formatters';
import { useState } from 'react';

const statusColors = {
    1: 'info',
    2: 'warning',
    3: 'success',
    4: 'error',
};

const statusNames = {
    1: 'Pending',
    2: 'Paid',
    3: 'Completed',
    4: 'Cancelled',
};

const OrderCard = ({ order }) => {
    const { id, created_at, status, items, branch_id, pickup_time, total_price } = order;
    const [open, setOpen] = useState(false);
    const { branches } = useBranch();

    const itemNames = items.slice(0, 2).map((item) => {
        return `${item.product_name}${item.quantity > 1 ? ` x${item.quantity}` : ''}`;
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
                            label={capitalizeWords(statusNames[status])}
                            size="small"
                            variant="outlined"
                            sx={{ bgcolor: `${statusColors[status]}.bgcolor`, color: `${statusColors[status]}.main` }}
                        />
                    </Box>
                    <Typography fontSize={14} color="text.secondary">
                        <CalendarTodayOutlined sx={{ fontSize: 12, verticalAlign: 'text-top', mr: 0.5 }} />
                        Placed on {ISOtoLocale(created_at)}
                    </Typography>
                </Box>
                <Box>
                    <Typography fontWeight={500}>${total_price}</Typography>
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

                    {pickup_time && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <TaskAltOutlined fontSize="small" sx={{ color: 'success.light' }} />
                            <Typography variant="body2" color="text.secondary">
                                Pickup on {ISOtoLocale(pickup_time)}
                            </Typography>
                        </Stack>
                    )}
                </Box>
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
                            {/* Product Info */}
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 0,
                                }}
                            >
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={500}>
                                        {item.product_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Qty: {item.quantity} &nbsp; ${item.unit_price} each
                                    </Typography>
                                </Box>
                                <Typography fontWeight={500}>${item.unit_price * item.quantity}</Typography>
                            </Box>
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
                                Order Summary
                            </Typography>
                            <Box sx={{ pl: 4 }}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Subtotal</Typography>
                                    <Typography>${total_price}</Typography>
                                </Stack>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography fontWeight={500}>Total</Typography>
                                    <Typography fontWeight={500}>${total_price}</Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={500} fontSize={18} mb={1}>
                            <LocalShippingOutlined
                                sx={{ fontSize: 24, color: 'primary.main', verticalAlign: 'top', mr: 1 }}
                            />
                            Pickup Information
                        </Typography>
                        <Box sx={{ pl: 4 }}>
                            {branch_id && (
                                <>
                                    <Typography variant="body2" fontWeight={500}>
                                        Location
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {branches.find((branch) => branch.id === branch_id)?.name || 'At Home'}
                                    </Typography>
                                </>
                            )}
                            {pickup_time && (
                                <>
                                    <Typography variant="body2" fontWeight={500} mt={1}>
                                        Pickup Time
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {ISOtoLocale(pickup_time)}
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
