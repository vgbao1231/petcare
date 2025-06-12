import { Box, Button, Stack, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { useCallback, useMemo, useState } from 'react';
import OrderCard from './OrderCard';
import { orderServices } from '@services/orderServices';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@src/hooks/useAuth';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MyOrderPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = useCallback((index) => setCurrentTab(index), []);
    const { userInfo } = useAuth();

    const { data: orders } = useQuery({
        queryKey: ['myOrders', userInfo.userId],
        queryFn: () => orderServices.getOrdersById(userInfo.userId),
        enabled: !!userInfo.userId, // chỉ gọi API nếu có userId
    });

    const getFilteredOrders = useMemo(() => {
        const validOrders = (orders || []).filter((a) => !!a.pickup_time);
        if (currentTab === 1) return validOrders.filter((a) => a.status === 1);
        if (currentTab === 2) return validOrders.filter((a) => a.status === 2);
        if (currentTab === 3) return validOrders.filter((a) => a.status === 3);
        if (currentTab === 4) return validOrders.filter((a) => a.status === 4);
        return validOrders; // All Orders
    }, [currentTab, orders]);

    if (!orders)
        return (
            <Box sx={{ pt: 12, px: 25, pb: 5, height: '100vh' }}>
                <Typography fontSize={24} fontWeight={600}>
                    My Orders
                </Typography>

                <Box sx={{ ...centerSx, flexDirection: 'column', gap: 1.5, height: '50vh' }}>
                    <Box sx={{ ...centerSx, p: 2, bgcolor: '#f0f0f0', borderRadius: '50%' }}>
                        <ShoppingCartOutlined sx={{ fontSize: 50, color: '#78716c' }} />
                    </Box>

                    <Typography variant="h5" fontWeight={500}>
                        You have no orders yet
                    </Typography>
                    <Typography color="text.secondary">{"Looks like you haven't placed any orders yet."}</Typography>

                    <Button component={Link} to="/product" variant="contained" sx={{ textTransform: 'none' }}>
                        Browse Products
                    </Button>
                </Box>
            </Box>
        );

    return (
        <Box
            sx={{
                pt: 12,
                px: 24,
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography fontSize={24} fontWeight={500} mb={2}>
                My Orders
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 0.6, borderRadius: 2, ...centerSx, gap: 2, alignSelf: 'start' }}>
                {['All Orders', 'Pending', 'Paid', 'Completed', 'Cancelled'].map((tab, index) => (
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
            <Stack spacing={4} sx={{ px: 1, pt: 2, pb: 1 }}>
                {getFilteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </Stack>
        </Box>
    );
};

export default MyOrderPage;
