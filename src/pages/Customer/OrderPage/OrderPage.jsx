import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Divider,
    Grid2,
    Stack,
    Typography,
} from '@mui/material';
import { useCart } from '@src/hooks/useCart';
import { FormProvider, useForm } from 'react-hook-form';
import {
    AccessTime,
    LocationOnOutlined,
    Payment,
    Person,
    ShoppingCart,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import ProductCard from './ProductCard';
import { centerSx } from '@src/theme';
import FormTimePicker from '@src/components/reuseable/FormRHF/FormTimePicker';
import { useBranch } from '@src/hooks/useBranch';
import { useAuth } from '@src/hooks/useAuth';
import { orderServices } from '@services/orderServices';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { checkPastDate } from '@src/utils/validators';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TermsDialog from './TermsDialog';

const OrderPage = () => {
    const { cart: cartBranches, setCart } = useCart();
    const { selectedBranch, branches } = useBranch();
    const cart = cartBranches[selectedBranch]?.items || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const methods = useForm({ mode: 'all' });
    const { userInfo } = useAuth();
    const date = methods.watch('date');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const { mutate: createOrder } = useMutation({
        mutationFn: (data) => orderServices.createOrder(data),
        onError: () => toast.error('Failed to create order'),
        onSuccess: (data, variables) => {
            toast.success('Order created successfully');
            setCart((prev) => {
                const updated = { ...prev };
                delete updated[selectedBranch];
                return updated;
            });
            navigate('/order-success', { state: { data, variables, selectedProducts: cart, total } });
        },
    });

    const handleSubmit = (data) => {
        const formData = {
            ...data,
            branch_id: selectedBranch,
            pickup_time: data.date
                .hour(data.time.hour())
                .minute(data.time.minute())
                .tz('Asia/Ho_Chi_Minh', true)
                .format('YYYY-MM-DDTHH:mm:ssZ'),
            customer_id: userInfo.userId,
            items: cart.map((item) => ({
                product_id: item.id,
                product_name: item.name,
                product_type: item.type,
                quantity: item.quantity,
                unit_price: item.price,
            })),
        };
        delete formData.time; // Remove time field as we combine it with date
        delete formData.date; // Remove date field as we combine it with time
        console.log(formData);

        createOrder(formData);
    };

    if (cart.length === 0)
        return (
            <Box sx={{ pt: 12, px: 25, pb: 5, height: '100vh' }}>
                <Typography fontSize={24} fontWeight={600}>
                    Checkout
                </Typography>
                <Box
                    sx={{
                        ...centerSx,
                        flexDirection: 'column',
                        gap: 1.5,
                        height: '50vh',
                    }}
                >
                    <Box sx={{ p: 2, bgcolor: '#f0f0f0', borderRadius: '50%', ...centerSx }}>
                        <ShoppingCartOutlined sx={{ fontSize: 50, color: '#78716c' }} />
                    </Box>
                    <Typography variant="h5" fontWeight={500}>
                        Your cart in this branch is empty
                    </Typography>
                    <Typography color="text.secondary">{"You haven't added any products to your cart yet."}</Typography>
                    <Button component={Link} to="/product" variant="contained" sx={{ textTransform: 'none' }}>
                        Browse Products
                    </Button>
                </Box>
            </Box>
        );

    return (
        <Box sx={{ pt: 14, px: 28 }}>
            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}
                >
                    {/* LEFT */}
                    <Grid2 sx={{ flex: 1 }}>
                        <Card sx={{ mb: 2, border: 1, borderColor: 'divider' }} elevation={0}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        sx={{
                                            bgcolor: '#E3F2FD',
                                            color: '#1976D2',
                                            p: 0.5,
                                            mr: 1,
                                            borderRadius: 2,
                                            ...centerSx,
                                        }}
                                    >
                                        <Person />
                                    </Box>
                                    <Typography variant="h6">Customer Details</Typography>
                                </Box>
                                <Box sx={{ pl: 3 }}>
                                    <Typography>
                                        <strong>Name:</strong> {userInfo.name}
                                    </Typography>
                                    {userInfo.phoneNumber && (
                                        <Typography>
                                            <strong>Phone:</strong> {userInfo.phoneNumber}
                                        </Typography>
                                    )}
                                    <Typography>
                                        <strong>Email:</strong> {userInfo.email}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card sx={{ mb: 2, border: 1, borderColor: 'divider' }} elevation={0}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        sx={{
                                            bgcolor: '#F3E5F5',
                                            color: '#9C27B0',
                                            p: 0.5,
                                            mr: 1,
                                            borderRadius: 2,
                                            ...centerSx,
                                        }}
                                    >
                                        <LocationOnOutlined />
                                    </Box>
                                    <Typography variant="h6">Pickup Location</Typography>
                                </Box>
                                <Box sx={{ pl: 3 }}>
                                    <Typography>
                                        <strong>Branch:</strong> {branches.find((b) => b.id === selectedBranch)?.name}
                                    </Typography>
                                    <Typography>
                                        <strong>Location:</strong>{' '}
                                        {branches.find((b) => b.id === selectedBranch)?.location}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card sx={{ mb: 2, border: 1, borderColor: 'divider' }} elevation={0}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        sx={{
                                            bgcolor: '#FFF3E0   ',
                                            color: '#FB8C00',
                                            p: 0.5,
                                            mr: 1,
                                            borderRadius: 2,
                                            ...centerSx,
                                        }}
                                    >
                                        <AccessTime />
                                    </Box>
                                    <Typography variant="h6">Pickup Schedule</Typography>
                                </Box>
                                <Grid2 container spacing={2} sx={{ mt: 1 }}>
                                    <Grid2 size={6}>
                                        <FormTimePicker
                                            id="date"
                                            name="date"
                                            label="Date"
                                            type="date"
                                            format="DD/MM/YYYY"
                                            fullWidth
                                            disablePast
                                            InputLabelProps={{ shrink: true }}
                                            rules={{
                                                required: 'Please enter date',
                                                validate: (v) => checkPastDate(v) || 'Date cannot be in the past',
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <FormTimePicker
                                            id="time"
                                            name="time"
                                            label="Time"
                                            type="time"
                                            minutesStep={15}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            rules={{
                                                required: 'Please enter time',
                                                validate: (v) =>
                                                    date
                                                        .hour(v.hour())
                                                        .minute(v.minute())
                                                        .second(0)
                                                        .diff(dayjs(), 'hour') >= 2 ||
                                                    'Please select a time at least 2 hours from now.',
                                            }}
                                        />
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>

                        <Alert icon={<Payment />} severity="info" sx={{ mb: 2, alignItems: 'flex-start' }}>
                            <AlertTitle>Pickup Information</AlertTitle>
                            If you do not arrive within 2 hours after the scheduled pickup time, your order will be
                            automatically cancelled.
                        </Alert>
                    </Grid2>

                    {/* RIGHT */}
                    <Grid2 sx={{ width: 400 }}>
                        <Card sx={{ border: 1, borderColor: 'divider' }} elevation={0}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    <ShoppingCart sx={{ mr: 1 }} /> Order Summary
                                </Typography>

                                <Stack spacing={2}>
                                    {cart.map((product, index) => (
                                        <ProductCard
                                            key={index}
                                            product={product}
                                            sx={{ borderTop: index !== 0 ? 1 : 0, borderColor: 'divider', p: 2 }}
                                        />
                                    ))}
                                </Stack>

                                <Divider sx={{ my: 2 }} />
                                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>Shipping</Typography>
                                    <Typography>Free</Typography>
                                </Box> */}

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="h6">Total:</Typography>
                                    <Typography variant="h6">${total.toFixed(2)}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2, py: 1, alignItems: 'center' }}>
                                    <Checkbox
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        size="small"
                                    />
                                    <Box flex={1}>
                                        <Typography fontSize={13} sx={{ fontWeight: 500, cursor: 'pointer' }}>
                                            I agree to the <TermsDialog />
                                        </Typography>
                                        <Typography fontSize={10} color="text.secondary">
                                            By checking this box, you agree to the terms and conditions.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1 }}
                                    disabled={!acceptTerms}
                                >
                                    Complete Order
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default OrderPage;
