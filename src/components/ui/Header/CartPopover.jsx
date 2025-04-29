import { ShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button, Popover, Typography, Chip } from '@mui/material';
import { useCart } from '@src/hooks/useCart';
import { centerSx, textEllipsisSx } from '@src/theme';
import { Link } from 'react-router-dom';

const CartPopover = ({ anchorEl, setAnchorEl }) => {
    const handleClose = () => setAnchorEl(null);
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            disableScrollLock
        >
            <Box sx={{ width: 320 }}>
                <Box
                    sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                        ...centerSx,
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography fontWeight={500}>Your Cart</Typography>
                    <Chip size="small" label={`${totalItems} items`} color="primary" />
                </Box>

                {/* Danh sách sản phẩm */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxHeight: 210,
                        overflowY: 'auto',
                    }}
                >
                    {cart.length === 0 ? (
                        <Box sx={{ ...centerSx, flexDirection: 'column' }}>
                            <Box sx={{ ...centerSx, p: 1.5, bgcolor: '#f5f5f5', borderRadius: '50%' }}>
                                <ShoppingCartOutlined sx={{ fontSize: 26, color: '#78716c' }} />
                            </Box>

                            <Typography fontWeight={500} mt={1.5}>
                                Your cart is empty
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add items to your cart to see them here
                            </Typography>
                            <Button component={Link} to="/product" variant="contained" sx={{ mt: 2, py: 0.5 }}>
                                Continue Shopping
                            </Button>
                        </Box>
                    ) : (
                        cart.map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    component="img"
                                    src={item.imgUrl}
                                    sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1.5 }}
                                />
                                <Box sx={{ ...textEllipsisSx }}>
                                    <Typography variant="body2" sx={{ ...textEllipsisSx }}>
                                        {item.name}
                                    </Typography>
                                    <Typography fontSize={12} color="text.secondary">
                                        ${item.price} x {item.quantity}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" fontWeight={500} ml="auto">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                            </Box>
                        ))
                    )}
                </Box>
                {cart.length !== 0 && (
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={500}>Total: </Typography>
                            <Typography fontWeight={500}>${total.toFixed(2)}</Typography>
                        </Box>

                        {/* Nút View Cart & Checkout */}
                        <Button
                            component={Link}
                            to="/cart"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={handleClose}
                        >
                            View Cart
                        </Button>
                        <Button component={Link} to="/checkout" fullWidth variant="outlined" sx={{ mt: 1 }}>
                            Checkout
                        </Button>
                    </Box>
                )}
            </Box>
        </Popover>
    );
};

export default CartPopover;
