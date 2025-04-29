import { Box, Stack, Typography } from '@mui/material';
import { centerSx } from '@src/theme';
import { useCallback, useMemo, useState } from 'react';
import OrderCard from './OrderCard';

const orders = [
    {
        id: 'ORD-12345',
        dateTime: '2023-07-15T10:23:00Z',
        status: 'Delivered',
        items: [
            {
                id: '1',
                name: 'Premium Dog Food',
                price: 29.99,
                quantity: 2,
                image: '/src/assets/gura.jpg',
            },
            {
                id: '4',
                name: 'Flea & Tick Medicine',
                price: 19.99,
                quantity: 1,
                image: '/src/assets/gura.jpg',
            },
        ],
        method: 'Cash on Delivery',
        note: 'Please leave at the front door if no one answers',
        deliveredOn: '2023-07-17',
        summary: {
            subtotal: 79.97,
            total: 79.97,
        },
    },
    {
        id: 'ORD-12346',
        dateTime: '2023-07-10T15:45:00Z',
        status: 'Out for Delivery',
        items: [
            {
                id: '2',
                name: 'Cat Scratching Post',
                price: 49.99,
                quantity: 1,
                image: '/src/assets/gura.jpg',
            },
            {
                id: '5',
                name: 'Interactive Dog Toy',
                price: 14.99,
                quantity: 1,
                image: '/src/assets/gura.jpg',
            },
        ],
        method: 'Bank Transfer',
        note: 'Call before delivery',
        summary: {
            subtotal: 64.98,
            total: 64.98,
        },
    },
    {
        id: 'ORD-12347',
        dateTime: '2023-06-28T09:15:00Z',
        status: 'Processing',
        items: [
            {
                id: '6',
                name: 'Cat Litter Box',
                price: 34.99,
                quantity: 1,
                image: '/src/assets/gura.jpg',
            },
        ],
        method: 'Bank Transfer',
        summary: {
            subtotal: 34.99,
            total: 34.99,
        },
    },
];

const MyOrderPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = useCallback((index) => setCurrentTab(index), []);

    const getFilteredOrders = useMemo(() => {
        if (currentTab === 1) return orders.filter((a) => a.status === 'Processing');
        if (currentTab === 2) return orders.filter((a) => a.status === 'Out for Delivery');
        if (currentTab === 3) return orders.filter((a) => a.status === 'Delivered');
        if (currentTab === 4) return orders.filter((a) => a.status === 'Cancelled');
        return orders; // All Orders
    }, [currentTab]);

    return (
        <Box
            sx={{
                pt: 12,
                px: 24,
                pb: 5,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography fontSize={24} fontWeight={500} mb={2}>
                My Orders
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 0.6, borderRadius: 2, ...centerSx, gap: 2, alignSelf: 'start' }}>
                {['All Orders', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((tab, index) => (
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
                {getFilteredOrders.map((appointment) => (
                    <OrderCard key={appointment.id} {...appointment} />
                ))}
            </Stack>
        </Box>
    );
};

export default MyOrderPage;
