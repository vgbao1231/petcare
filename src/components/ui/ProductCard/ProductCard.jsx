import { AddShoppingCart, Check } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Grow, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

const ProductCard = ({ img, name, price, category, productId }) => {
    console.log(productId);

    const [added, setAdded] = useState(false);

    const handleClick = useCallback(() => {
        setAdded(true);
        setTimeout(() => setAdded(false), 1000); // 2s sau về trạng thái cũ
    }, []);

    return (
        <Card
            sx={{
                flex: 1,
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <CardMedia sx={{ height: 140 }} image={img} title="gura" />
            <CardContent>
                <Typography gutterBottom sx={{ fontWeight: 600, minHeight: 48 }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {category}
                </Typography>
                <Typography fontWeight={600}>{price}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pt: 0, pb: 2 }}>
                <Button variant="contained" size="small" color="brand">
                    View Detail
                </Button>
                <Button
                    variant="outlined"
                    sx={{ minWidth: 50, color: 'brand.main', borderColor: 'brand.main' }}
                    onClick={handleClick}
                    disabled={added}
                >
                    <Grow in={!added} timeout={500}>
                        <span style={{ display: added ? 'none' : 'flex', alignItems: 'center', gap: 8 }}>
                            <AddShoppingCart fontSize="small" />
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
