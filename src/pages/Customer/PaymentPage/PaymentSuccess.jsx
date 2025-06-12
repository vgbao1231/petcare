import { Box, Button, Stack, Typography } from '@mui/material';
import { paymentServices } from '@services/paymentServices';
import { centerSx } from '@src/theme';
import { useMutation } from '@tanstack/react-query';
import { CircleCheckBig } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderCode = params.get('orderCode');
    const status = params.get('status');
    // const navigate = useNavigate();

    const { mutate: updatePayment } = useMutation({
        mutationFn: () => paymentServices.updatePaymentStatus({ orderCode: Number(orderCode), status: 'COMPLETED' }),
        onSettled: () => {
            // Tự động chuyển hướng sau 5 giây
            setTimeout(() => {
                // navigate('/');
            }, 5000);
        },
    });

    useEffect(() => {
        if (orderCode && status) updatePayment();
    }, [orderCode, status, updatePayment]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #f0fdf4 , #d1fae5)',
                px: 2,
                ...centerSx,
            }}
        >
            <Stack
                spacing={1.5}
                alignItems="center"
                sx={{ bgcolor: 'white', borderRadius: 2, p: { xs: 3, sm: 5 }, boxShadow: 3 }}
            >
                <Box sx={{ borderRadius: '50%', bgcolor: 'success.bgcolor', p: 2.5, ...centerSx }}>
                    <CircleCheckBig size={40} style={{ color: '#16a34a' }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" textAlign="center" color="success.dark">
                    Payment Successful!
                </Typography>
                <Typography textAlign="center" color="success.main">
                    Your transaction has been processed successfully
                </Typography>
                <Typography textAlign="center" variant="h6" fontWeight={500}>
                    Thank you for your purchase
                </Typography>
                <Typography textAlign="center" color="text.secondary">
                    Please return to the app to continue
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ px: 5, textTransform: 'none', fontSize: 16 }}
                    fullWidth
                >
                    Return to App
                </Button>
                <Typography variant="body2" textAlign="center" color="text.secondary">
                    {"If you're not automatically redirected, please tap the button above"}
                </Typography>
            </Stack>
        </Box>
    );
};

export default PaymentSuccess;
