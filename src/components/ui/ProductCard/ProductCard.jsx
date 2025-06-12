import { Check } from '@mui/icons-material';
import { Box as LucideBox } from 'lucide-react';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grow, Typography } from '@mui/material';
import { useBranch } from '@src/hooks/useBranch';
import { useCart } from '@src/hooks/useCart';
import { textEllipsisSx } from '@src/theme';
import { useCallback, useState } from 'react';

const ProductCard = ({ id, imgUrl, name, price, stock, type }) => {
    const [added, setAdded] = useState(false);
    const { cart, setCart } = useCart();
    const { selectedBranch } = useBranch();

    const handleClick = useCallback(
        (newItem) => {
            setAdded(true);

            const branchCart = cart[selectedBranch]?.items || [];
            const existingIndex = branchCart.findIndex((item) => item.id === newItem.id && item.type === newItem.type);

            let updatedItems;
            if (existingIndex !== -1) {
                updatedItems = [...branchCart];
                updatedItems[existingIndex].quantity += 1;
            } else {
                updatedItems = [...branchCart, newItem];
            }

            setCart({ ...cart, [selectedBranch]: { items: updatedItems } });

            setTimeout(() => setAdded(false), 1000);
        },
        [cart, setCart, selectedBranch]
    );

    return (
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: 1, height: 300, ':hover': { boxShadow: 3 } }}>
            <CardMedia sx={{ height: 140 }} component="img" image={imgUrl} title="Product Image" />
            <CardContent sx={{ py: 1 }}>
                <Chip
                    label={type}
                    size="small"
                    variant="outlined"
                    sx={{
                        height: 18,
                        fontSize: 12,
                        px: 0.5,
                    }}
                />
                <Typography sx={{ fontWeight: 600, ...textEllipsisSx }}>{name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LucideBox size={12} />
                    <Typography fontSize={12}>Stock: {stock}</Typography>
                </Box>
                <Typography fontWeight={600}>${`${Number(price).toFixed(2)}`}</Typography>
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
