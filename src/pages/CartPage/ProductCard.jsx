import { Add, DeleteForeverOutlined, Remove } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { useCart } from '@src/hooks/useCart';
import { textEllipsisSx } from '@src/theme';

const ProductCard = ({ product, sx }) => {
    const { setCart } = useCart();
    const { id, type, imgUrl, name, description, price, quantity } = product;

    const removeProduct = () => {
        setCart((prev) => prev.filter((item) => item.id !== id || item.type !== type));
    };

    const handleIncrease = () => {
        setCart((prev) =>
            prev.map((item) => (item.id === id && item.type === type ? { ...item, quantity: item.quantity + 1 } : item))
        );
    };
    const handleDecrease = () => {
        setCart((prev) =>
            prev.map((item) => (item.id === id && item.type === type ? { ...item, quantity: item.quantity - 1 } : item))
        );
    };

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: 0,
                minHeight: 112,
                ...sx,
            }}
        >
            <CardMedia component="img" sx={{ width: 70, height: 70, borderRadius: 1 }} image={imgUrl} />
            <CardContent sx={{ flex: 1, padding: '0 16px', maxWidth: 320 }}>
                <Typography fontWeight={500}>{name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={textEllipsisSx}>
                    {description}
                </Typography>
                <Typography mt={1} fontWeight={500}>
                    ${price.toFixed(2)}
                </Typography>
            </CardContent>
            <Box display="flex" alignItems="center" gap={3} ml="auto">
                <Box display="flex" alignItems="center">
                    <IconButton size="small" onClick={handleDecrease} disabled={quantity === 1}>
                        <Remove />
                    </IconButton>
                    <Typography fontSize={17} sx={{ minWidth: 32, textAlign: 'center' }}>
                        {quantity}
                    </Typography>
                    <IconButton size="small" onClick={handleIncrease}>
                        <Add />
                    </IconButton>
                </Box>
                <Typography fontWeight={500} sx={{ minWidth: 80, textAlign: 'center' }}>
                    ${(price * quantity).toFixed(2)}
                </Typography>
                <IconButton size="small" onClick={removeProduct}>
                    <DeleteForeverOutlined />
                </IconButton>
            </Box>
        </Card>
    );
};

export default ProductCard;
