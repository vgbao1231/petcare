import { Box, Typography, Paper, Divider, Stack, Button, Alert, AlertTitle } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import { Done } from '@mui/icons-material';
import { centerSx } from '@src/theme';
import { Link } from 'react-router-dom';

const ConfirmStep = () => {
    return (
        <>
            {/* Success Icon */}
            <Box {...centerSx} flexDirection="column" mb={2}>
                <Box sx={{ ...centerSx, p: 1.5, bgcolor: 'success.bgcolor', borderRadius: '50%' }}>
                    <Done sx={{ fontSize: 32, borderRadius: '50%', color: 'success.main' }} />
                </Box>

                <Typography variant="h5" fontWeight={600} mt={1}>
                    Order Confirmed!
                </Typography>
                <Typography color="text.secondary">
                    Thank you for your purchase. Your order has been placed successfully.
                </Typography>
            </Box>

            {/* Order Summary */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Order Summary
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Order Number:</Typography>
                    <Typography fontWeight={500}>#ORD-12345</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Order Date:</Typography>
                    <Typography>21/4/2025</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Payment Method:</Typography>
                    <Typography>Payment on delivery/pickup</Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={600}>Total:</Typography>
                    <Typography fontWeight={700}>$149.96</Typography>
                </Stack>
            </Paper>

            {/* Delivery Info */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    Delivery Information
                </Typography>
                <Typography fontWeight={600}>Bao Vo Gia</Typography>
                <Typography>0112333444 | root@gmail.com</Typography>

                <Box mt={2}>
                    <Typography fontWeight={600}>Store Pickup:</Typography>
                    <Typography>Eastside Branch</Typography>
                    <Typography>456 East Ave, East District</Typography>
                </Box>
            </Paper>

            {/* Alerts */}
            <Alert icon={<PaymentIcon />} severity="info" sx={{ mb: 2, alignItems: 'flex-start' }}>
                <AlertTitle>Payment Information</AlertTitle>
                Payment will be handled by our staff when you pick up your order.
            </Alert>
            <Alert icon={<InfoOutlinedIcon />} severity="info" sx={{ mb: 3, alignItems: 'flex-start' }}>
                <AlertTitle>What happens next?</AlertTitle>
                {
                    "We'll prepare your order and notify you when it’s ready for pickup. You will receive an email confirmation shortly."
                }
            </Alert>

            {/* Buttons */}
            <Stack direction="row" spacing={6} justifyContent="center">
                <Button component={Link} to="/product" variant="contained">
                    Continue Shopping
                </Button>
                <Button component={Link} to="/my-order" variant="outlined">
                    View My Orders
                </Button>
            </Stack>
        </>
    );
};

export default ConfirmStep;
