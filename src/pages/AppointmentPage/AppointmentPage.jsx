import { Add, DeleteForeverOutlined, Remove, Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useCallback } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const services = [
    {
        serviceId: 1,
        name: 'Dog Grooming',
        desc: 'Full-service grooming for your dog, including bath and haircut',
        price: 50,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        serviceId: 2,
        name: 'Cat Boarding',
        desc: 'Safe and comfortable boarding for your cat while you are away',
        price: 40,
        imgUrl: '/src/assets/gura.jpg',
    },
];

const products = [
    {
        productId: 1,
        name: 'Premium Dog Food',
        desc: 'High-quality dog food with essential nutrients',
        price: 25,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        productId: 2,
        name: 'Cat Scratching Post',
        desc: 'Durable scratching post to keep your cat entertained',
        price: 35,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        productId: 3,
        name: 'Pet Shampoo',
        desc: 'Gentle and effective shampoo for a clean and healthy coat',
        price: 15,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        productId: 4,
        name: 'Chew Toy',
        desc: 'Safe and fun chew toy for dogs of all sizes',
        price: 10,
        imgUrl: '/src/assets/gura.jpg',
    },
    {
        productId: 5,
        name: 'Automatic Water Dispenser',
        desc: 'Ensures a fresh water supply for your pet at all times',
        price: 45,
        imgUrl: '/src/assets/gura.jpg',
    },
];

const AppointmentPage = () => {
    // const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [itemTab, setItemTab] = useState(0); // 0: Mở ds sản phẩm, 1: Mở ds dịch vụ
    const methods = useForm({ mode: 'all' });

    const subTotal = [...selectedProducts, ...selectedServices].reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = useCallback(
        (formData) => {
            console.log(formData);
            console.log(selectedServices);
            console.log(selectedProducts);
        },
        [selectedServices, selectedProducts]
    );

    // useEffect(() => {
    //     const getAllServices = async () => {
    //         try {
    //             const res = await serviceServices.getAllServices();
    //             setServices(res);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     getAllServices();
    // }, []);

    return (
        <Box sx={{ pt: 14, px: 20, pb: 5 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Left Panel */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                    {/* Các nút chọn thêm Services/Products */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {['Services', 'Product'].map((btn, index) => (
                            <Button
                                key={index}
                                variant={index === itemTab ? 'contained' : 'outlined'}
                                fullWidth
                                color="brand"
                                onClick={() => setItemTab(index)}
                                disableTouchRipple
                                sx={{ bgcolor: index === itemTab ? 'none' : '#fff' }}
                            >
                                Choose {btn}
                            </Button>
                        ))}
                    </Box>

                    {/* Search bar */}
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder={itemTab ? 'Search products...' : 'Search services...'}
                        sx={{ bgcolor: '#fff' }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Danh sách item khả dụng */}
                    {itemTab !== undefined && (
                        <Box sx={{ bgcolor: '#fff', borderRadius: 2, border: 1, borderColor: 'gray.main', p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" fontWeight="bold" mb={1.5}>
                                    Available {itemTab === 0 ? 'Services' : 'Products'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {itemTab === 0
                                    ? services.map((service) => (
                                          <ServiceCard
                                              key={service.serviceId}
                                              service={service}
                                              setSelectedServices={setSelectedServices}
                                          />
                                      ))
                                    : products.map((product) => (
                                          <ProductCard
                                              key={product.productId}
                                              product={product}
                                              setSelectedProducts={setSelectedProducts}
                                          />
                                      ))}
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Right Panel */}
                <FormProvider {...methods}>
                    <Box
                        component="form"
                        onSubmit={methods.handleSubmit(handleSubmit)}
                        sx={{ width: 440, display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <Box
                            sx={{ borderRadius: 2, border: 1, borderColor: 'gray.main', bgcolor: '#fff', p: 2, px: 3 }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Appointment Details
                            </Typography>

                            <FormInput
                                name="date"
                                label="Date"
                                type="date"
                                sx={{ mb: 2 }}
                                fullWidth
                                slotProps={{ inputLabel: { shrink: true } }}
                                rules={{
                                    required: 'Please enter date',
                                }}
                            />

                            <FormInput
                                name="time"
                                label="Time"
                                type="time"
                                minutesStep={15}
                                sx={{ mb: 2 }}
                                fullWidth
                                slotProps={{ inputLabel: { shrink: true } }}
                                rules={{
                                    required: 'Please enter time',
                                }}
                            />
                            <FormInput
                                name="address"
                                label="Address"
                                sx={{ mb: 2 }}
                                fullWidth
                                slotProps={{ inputLabel: { shrink: true } }}
                                rules={{ required: 'Please enter your address' }}
                                placeholder="Enter your address"
                            />
                            <FormInput
                                name="note"
                                label="Note"
                                multiline
                                sx={{ mb: 2 }}
                                fullWidth
                                slotProps={{ inputLabel: { shrink: true } }}
                                placeholder="Any secial requests or information"
                                rows={2}
                            />
                        </Box>

                        {/* Selected Items */}
                        <Box
                            sx={{ borderRadius: 2, border: 1, borderColor: 'gray.main', bgcolor: '#fff', p: 2, px: 3 }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={1}>
                                Selected Items
                            </Typography>
                            {selectedProducts.length === 0 && selectedServices.length === 0 && (
                                <Typography variant="body2" sx={{ m: 1, color: 'text.secondary', textAlign: 'center' }}>
                                    No items selected yet
                                </Typography>
                            )}

                            {selectedServices.length !== 0 && (
                                <Box sx={{ bgcolor: '#fff', borderRadius: 2, mb: 2 }}>
                                    <Typography fontSize={12} mb={0.5} color="text.secondary">
                                        Services
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {selectedServices.map((service) => (
                                            <ServiceCard
                                                key={service.serviceId}
                                                service={service}
                                                selected
                                                setSelectedServices={setSelectedServices}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                            {selectedProducts.length !== 0 && (
                                <Box sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                                    <Typography fontSize={12} mb={0.5} color="text.secondary">
                                        Products
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {selectedProducts.map((product) => (
                                            <ProductCard
                                                key={product.productId}
                                                product={product}
                                                selected
                                                setSelectedProducts={setSelectedProducts}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" mb={0.5} color="text.secondary">
                                    Subtotal:
                                </Typography>
                                <Typography variant="body2">${subTotal.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={500}>Total Amount: </Typography>
                                <Typography fontWeight={500}>${subTotal.toFixed(2)}</Typography>
                            </Box>
                        </Box>

                        <Button type="submit" variant="contained" fullWidth color="brand">
                            Confirm Booking
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </Box>
    );
};

const ServiceCard = ({ service, selected, setSelectedServices }) => {
    const { serviceId, imgUrl, name, desc, price, quantity } = service;

    const addService = () => {
        console.log(serviceId);

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
                display: 'flex',
                alignItems: 'center',
                py: selected ? 0.5 : 1,
                px: selected ? 1 : 2,
                border: 1,
                borderColor: 'gray.main',
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
                        {desc}
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

const ProductCard = ({ product, selected, setSelectedProducts }) => {
    const { productId, imgUrl, name, desc, price, quantity } = product;

    const addProduct = () => {
        setSelectedProducts((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeProduct = () => {
        setSelectedProducts((prev) => prev.filter((item) => item.productId !== productId));
    };

    const handleIncrease = () => addProduct();
    const handleDecrease = () => {
        setSelectedProducts((prev) =>
            prev.map((item) =>
                item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                py: selected ? 0.5 : 1,
                px: selected ? 1 : 2,
                border: 1,
                borderColor: 'gray.main',
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
                        {desc}
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
                    <IconButton size="small" sx={{ marginLeft: 1 }} onClick={removeProduct}>
                        <DeleteForeverOutlined fontSize="small" />
                    </IconButton>
                </Box>
            ) : (
                <IconButton size="small" onClick={addProduct}>
                    <Add fontSize="small" />
                </IconButton>
            )}
        </Card>
    );
};

export default AppointmentPage;
