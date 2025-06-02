import { Add, DeleteForeverOutlined, Remove } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
const ServiceCard = ({ service, selected, setSelectedServices }) => {
    const { serviceId, imgUrl, name, description, price, quantity } = service;

    const addService = () => {
        setSelectedServices((prev) => {
            const existing = prev.find((item) => item.serviceId === serviceId);
            if (existing) {
                return prev.map((item) =>
                    item.serviceId === serviceId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...service, quantity: 1 }];
        });
    };
    const removeService = () => {
        setSelectedServices((prev) => prev.filter((item) => item.serviceId !== serviceId));
    };
    const handleIncrease = () => addService();
    const handleDecrease = () => {
        setSelectedServices((prev) =>
            prev.map((item) =>
                item.serviceId === serviceId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    return (
        <Card
            sx={{
                minHeight: 90,
                display: 'flex',
                alignItems: 'center',
                py: selected ? 0.5 : 1,
                px: selected ? 1 : 2,
                border: 1,
                borderColor: 'divider',
                boxShadow: 0,
                borderRadius: 2,
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: selected ? 36 : 60, height: selected ? 36 : 60, borderRadius: 1 }}
                image={imgUrl}
            />
            <CardContent sx={{ flex: 1, padding: '0 16px' }}>
                <Typography variant={selected ? 'body2' : 'body1'} fontWeight={500}>
                    {name}
                </Typography>
                {!selected && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
                <Typography
                    fontSize={selected ? 13 : 14}
                    fontWeight={selected ? 400 : 500}
                    sx={{ marginTop: selected ? 0.5 : 1 }}
                >
                    ${price.toFixed(2)}
                </Typography>
            </CardContent>
            {selected ? (
                <Box display="flex" alignItems="center">
                    <IconButton size="small" sx={{ p: 0.25 }} onClick={handleDecrease} disabled={quantity === 1}>
                        <Remove fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                        {quantity}
                    </Typography>
                    <IconButton size="small" sx={{ p: 0.25 }} onClick={handleIncrease}>
                        <Add fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ marginLeft: 1 }} onClick={removeService}>
                        <DeleteForeverOutlined fontSize="small" />
                    </IconButton>
                </Box>
            ) : (
                <IconButton size="small" onClick={addService}>
                    <Add fontSize="small" />
                </IconButton>
            )}
        </Card>
    );
};

export default ServiceCard;
