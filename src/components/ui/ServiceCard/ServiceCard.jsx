import { AddShoppingCart, Check } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grow, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

const ServiceCard = ({ icon, name, description, price }) => {
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
            }}
            elevation={2}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    bgcolor: '#fff',
                    borderRadius: 2,
                }}
            >
                {icon}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', p: 2, pl: 3, pt: 0 }}>
                <Typography fontWeight={700}>{price}</Typography>
                <Button variant="outlined" sx={{ minWidth: 50 }} onClick={handleClick} disabled={added}>
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

export default ServiceCard;
