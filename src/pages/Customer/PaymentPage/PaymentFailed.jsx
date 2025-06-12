import { Box, Button, Stack, Typography } from '@mui/material';
import { paymentServices } from '@services/paymentServices';
import { centerSx } from '@src/theme';
import { useMutation } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentFailed = () => {
    // http://26.30.229.237:8080/payments/cancel?code=00&id=9660d73fb1184a17ac50a961c56a07f7&cancel=true&status=CANCELLED&orderCode=1749537521793002
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderCode = params.get('orderCode');
    const status = params.get('status');
    // const navigate = useNavigate();

    const { mutate: updatePayment } = useMutation({
        mutationFn: () => paymentServices.updatePaymentStatus({ orderCode: Number(orderCode), status: 'CANCELLED' }),
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
                background: 'linear-gradient(to bottom right, #fef2f2 , #ffe4e6)',
                px: 2,
                ...centerSx,
            }}
        >
            <Stack
                spacing={1.5}
                alignItems="center"
                sx={{ bgcolor: 'white', borderRadius: 2, p: { xs: 3, sm: 5 }, boxShadow: 3 }}
            >
                <Box sx={{ borderRadius: '50%', bgcolor: 'error.bgcolor', p: 2.5, ...centerSx }}>
                    <CircleX size={40} style={{ color: '#dc2626' }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" textAlign="center" color="error.dark">
                    Payment Failed!
                </Typography>
                <Typography textAlign="center" color="error.main">
                    Your transaction could not be processed
                </Typography>
                <Typography textAlign="center" variant="h6" fontWeight={500}>
                    Something went wrong
                </Typography>
                <Typography textAlign="center" color="text.secondary">
                    Please check your information and try again
                </Typography>
                <Button variant="contained" color="error" sx={{ px: 5, textTransform: 'none', fontSize: 16 }} fullWidth>
                    Return to App
                </Button>
                <Typography variant="body2" textAlign="center" color="text.secondary">
                    {"If you're not automatically redirected, please tap the button above"}
                </Typography>
            </Stack>
        </Box>
    );
};

export default PaymentFailed;
