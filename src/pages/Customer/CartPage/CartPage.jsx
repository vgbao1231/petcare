import { Box, Button, Divider, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { useMemo } from 'react';
import { ArrowBack, DeleteForeverOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '@src/hooks/useCart';
import { useBranch } from '@src/hooks/useBranch';
import { centerSx } from '@src/theme';

const CartPage = () => {
    const { cart, setCart } = useCart();
    const { selectedBranch } = useBranch();
    const currentItems = cart[selectedBranch]?.items || [];

    const subTotal = currentItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = 0;
    const tax = 0;
    const total = useMemo(() => subTotal + shippingCost + tax, [subTotal, shippingCost, tax]);

    const clearBranchCart = (setCart) => {
        setCart((prev) => {
            const updated = { ...prev };
            delete updated[selectedBranch];
            return updated;
        });
    };

    if (currentItems.length === 0)
        return (
            <Box sx={{ pt: 12, px: 25, pb: 5, height: '100vh' }}>
                <Typography fontSize={24} fontWeight={600}>
                    Shopping Cart
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
        <Box sx={{ pt: 12, px: 30, pb: 5, height: '100vh' }}>
            <Typography fontSize={24} fontWeight={600}>
                Shopping Cart
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
                {/* Left Panel */}
                <Box sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 2,
                            maxHeight: 450,
                            overflowY: 'auto',
                        }}
                    >
                        {currentItems.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                sx={{ borderTop: index !== 0 ? 1 : 0, borderColor: 'divider', p: 2 }}
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            component={Link}
                            to="/product"
                            color="common"
                            startIcon={<ArrowBack />}
                            sx={{
                                bgcolor: 'background.paper',
                                textTransform: 'none',
                                border: 1,
                                borderColor: 'divider',
                                px: 2,
                                '&:hover': { bgcolor: 'common.light' },
                            }}
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            onClick={() => clearBranchCart(setCart)}
                            color="common"
                            startIcon={<DeleteForeverOutlined />}
                            sx={{
                                bgcolor: 'background.paper',
                                textTransform: 'none',
                                border: 1,
                                borderColor: 'divider',
                                px: 2,
                                '&:hover': { bgcolor: 'common.light' },
                            }}
                        >
                            Clear Cart
                        </Button>
                    </Box>
                </Box>

                {/* Right Panel */}
                <Box
                    sx={{
                        width: 340,
                        alignSelf: 'flex-start',
                        p: 3,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Typography variant="h6" fontWeight={500} mb={1}>
                        Order Summary
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.secondary">Subtotal: </Typography>
                            <Typography>${subTotal.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.secondary">Shipping: </Typography>
                            <Typography>${shippingCost.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.secondary">Tax: </Typography>
                            <Typography>${tax.toFixed(2)}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={500}>Total: </Typography>
                            <Typography fontWeight={500}>${total.toFixed(2)}</Typography>
                        </Box>
                        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField size="small" placeholder="Promo code" />
                            <Button variant="outlined">Apply</Button>
                        </Box> */}
                        <Button component={Link} to="/order" variant="contained" sx={{ mt: 1 }}>
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartPage;
