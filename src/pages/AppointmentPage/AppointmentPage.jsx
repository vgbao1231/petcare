import { Search } from '@mui/icons-material';
import { Box, Button, Chip, Divider, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import { orderServices } from '@services/orderServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { getTokenPayload } from '@src/utils/helpers';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ProductCard from './ProductCard';
import ServiceCard from './ServiceCard';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { toast } from 'react-toastify';
import { checkPastDate } from '@src/utils/validators';
import { serviceServices } from '@services/serviceServices';
import { productServices } from '@services/productServices';
import { branchServices } from '@services/branchServices';

const AppointmentPage = () => {
    const [branches, setBranches] = useState([]);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [itemTab, setItemTab] = useState(0); // 0: Mở ds sản phẩm, 1: Mở ds dịch vụ
    const methods = useForm({ mode: 'all' });
    const { token } = useAuth();
    const [servingType, setServingType] = useState(0);

    const subTotal = [...selectedProducts, ...selectedServices].reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = useCallback(
        async ({ date, time, address, branch, note }) => {
            try {
                const customer_id = parseInt(getTokenPayload(token).user_id);
                const utcDateTime = new Date(`${date}T${time.format('HH:mm')}:00+07:00`)
                    .toISOString()
                    .replace('.000', '');
                const serviceData = selectedServices.map((s) => ({ service_id: s.serviceId, quantity: s.quantity }));
                const productData = selectedProducts.map((p) => ({
                    product_id: p.product_id,
                    product_type: p.product_type,
                    quantity: p.quantity,
                    unit_price: p.price,
                }));

                const appointmentData = {
                    customer_id,
                    ...(servingType === 0 ? { customer_address: address } : { branch_id: branch }),
                    scheduled_time: utcDateTime,
                    note,
                    services: serviceData,
                };

                const appointmentRes = await appointmentServices.createAppointment(appointmentData);

                if (productData.length > 0) {
                    const orderData = {
                        customer_id,
                        ...(servingType === 0 ? { customer_address: address } : { branch_id: branch }),
                        appointment_id: appointmentRes.appointment_id,
                        items: productData,
                    };
                    await orderServices.createOrder(orderData);
                }
                toast.success('Successful appointment schedule');
            } catch (e) {
                console.log(e);
                toast.success('Failed to make an appointment!');
            }
        },

        [selectedServices, selectedProducts, token, servingType]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceRes = await serviceServices.getAllServices();
                setServices(serviceRes);
                const productRes = await productServices.getAllProducts();
                setProducts(productRes);
                const branchRes = await branchServices.getAllBranches();
                setBranches(branchRes.map((b) => ({ value: b.id, label: b.location })));
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

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
                                    : products.map((product, index) => (
                                          <ProductCard
                                              key={index}
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
                        sx={{ width: 440, display: 'flex', flexDirection: 'column', gap: 2 }}
                        onSubmit={methods.handleSubmit(handleSubmit)}
                    >
                        <Box
                            sx={{
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'gray.main',
                                bgcolor: '#fff',
                                p: 2,
                                px: 3,
                            }}
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
                                    validate: (v) => checkPastDate(v) || 'Date cannot be in the past',
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
                            <Stack direction="row" spacing={2} mb={2}>
                                {['home', 'shop'].map((label, index) => (
                                    <Chip
                                        key={index}
                                        label={`Serving at ${label}`}
                                        color="brand"
                                        variant={servingType === index ? 'filled' : 'outlined'}
                                        onClick={() => setServingType(index)}
                                    />
                                ))}
                            </Stack>
                            {servingType === 0 ? (
                                <FormInput
                                    name="address"
                                    label="Address"
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    rules={{ required: 'Please enter your address' }}
                                    placeholder="Enter your address"
                                />
                            ) : (
                                <FormSelect name="branch" fullWidth options={branches} sx={{ mb: 2 }} label="Branch" />
                            )}
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
                            sx={{
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'gray.main',
                                bgcolor: '#fff',
                                p: 2,
                                px: 3,
                            }}
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
                                        {selectedProducts.map((product, index) => (
                                            <ProductCard
                                                key={index}
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

export default AppointmentPage;
