import { Check } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Grow, Typography } from '@mui/material';
import { useCart } from '@src/hooks/useCart';
import { textEllipsisSx } from '@src/theme';
import { useCallback, useState } from 'react';

const ProductCard = ({ id, imgUrl, name, price, type }) => {
    const [added, setAdded] = useState(false);
    const { cart, setCart } = useCart();

    const handleClick = useCallback(
        (product) => {
            setAdded(true);

            const index = cart.findIndex((item) => item.id === product.id && item.type === product.type);
            if (index !== -1) {
                cart[index].quantity += product.quantity;
            } else {
                cart.push(product);
            }
            setCart([...cart]);

            setTimeout(() => setAdded(false), 1000); // 2s sau về trạng thái cũ
        },
        [cart, setCart]
    );

    return (
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: 1, height: 280, ':hover': { boxShadow: 3 } }}>
            <CardMedia sx={{ height: 140 }} image={imgUrl} title="gura" />
            <CardContent sx={{ pt: 1 }}>
                <Typography sx={{ fontWeight: 600, ...textEllipsisSx }}>{name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {type}
                </Typography>
                <Typography fontWeight={600}>${price}</Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pt: 0, pb: 0 }}>
                <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    onClick={() => handleClick({ id, type, imgUrl, name, price, quantity: 1 })}
                    disabled={added}
                >
                    <Grow in={!added} timeout={500}>
                        <span style={{ display: added ? 'none' : 'flex', alignItems: 'center', gap: 8 }}>
                            {/* <AddShoppingCart fontSize="small" /> */}
                            Add to Cart
                        </span>
                    </Grow>

                    <Grow in={added} timeout={500}>
                        <span style={{ display: !added ? 'none' : 'flex', alignItems: 'center', gap: 8 }}>
                            <Check fontSize="small" />
                        </span>
                    </Grow>
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
