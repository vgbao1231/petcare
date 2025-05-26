import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { memo } from 'react';

const ProductCard = ({ product }) => {
    const { id, type, imgUrl, name, price, quantity } = product;
    console.log(id, type);

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: 0,
                p: 0,
            }}
        >
            <CardMedia component="img" sx={{ width: 60, height: 60, borderRadius: 1 }} image={imgUrl} />
            <CardContent sx={{ flex: 1, padding: '0 16px', maxWidth: 320 }}>
                <Typography fontWeight={500} variant="body2">
                    {name}
                </Typography>
                <Typography mt={1} fontSize={12} color="text.secondary">
                    Qty: {quantity}
                </Typography>
            </CardContent>
            <Typography fontWeight={500} variant="body2" sx={{ textAlign: 'center', ml: 'auto' }}>
                ${(price * quantity).toFixed(2)}
            </Typography>
        </Card>
    );
};

export default memo(ProductCard);
