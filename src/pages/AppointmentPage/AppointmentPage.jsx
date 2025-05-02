import { Search } from '@mui/icons-material';
import { Box, Button, Chip, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import { orderServices } from '@services/orderServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { getTokenPayload } from '@src/utils/helpers';
import { useCallback } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ProductCard from './ProductCard';
import ServiceCard from './ServiceCard';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { toast } from 'react-toastify';
import { checkPastDate } from '@src/utils/validators';
import { serviceServices } from '@services/serviceServices';
import { productServices } from '@services/productServices';
import FormTimePicker from '@src/components/reuseable/FormRHF/FormTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useBranch } from '@src/hooks/useBranch';
import { useQueries } from '@tanstack/react-query';

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentPage = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [itemTab, setItemTab] = useState(0); // 0: Mở ds sản phẩm, 1: Mở ds dịch vụ
    const [searchValue, setSearchValue] = useState('');
    const { token } = useAuth();
    const [servingType, setServingType] = useState(0);
    const methods = useForm({ mode: 'all' });
    const date = methods.watch('date');
    const { branches } = useBranch();

    const subTotal = [...selectedProducts, ...selectedServices].reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = useCallback(
        async ({ date, time, address, branch, note }) => {
            try {
                const customer_id = parseInt(getTokenPayload(token).user_id);
                const scheduleTime = date
                    .hour(time.hour())
                    .minute(time.minute())
                    .tz('Asia/Bangkok', true)
                    .format('YYYY-MM-DDTHH:mm:ssZ');

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
                    scheduled_time: scheduleTime,
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
                toast.error('Failed to make an appointment!');
            }
        },

        [selectedServices, selectedProducts, token, servingType]
    );

    const [{ data: services = [] }, { data: products = [] }] = useQueries({
        queries: [
            {
                queryKey: ['services'],
                queryFn: serviceServices.getAllServices,
                onError: () => toast.error('Failed to load services'),
            },
            {
                queryKey: ['products'],
                queryFn: productServices.getAllProducts,
                onError: () => toast.error('Failed to load products'),
            },
        ],
    });

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
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
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
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'divider',
                                p: 2,
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" fontWeight="bold" mb={1.5}>
                                    Available {itemTab === 0 ? 'Services' : 'Products'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {itemTab === 0
                                    ? services
                                          .filter(({ name }) => name.toUpperCase().includes(searchValue.toUpperCase()))
                                          .map((service) => (
                                              <ServiceCard
                                                  key={service.serviceId}
                                                  service={service}
                                                  setSelectedServices={setSelectedServices}
                                              />
                                          ))
                                    : products
                                          .filter(({ name }) => name.toUpperCase().includes(searchValue.toUpperCase()))
                                          .map((product, index) => (
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
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
                                p: 2,
                                px: 3,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Appointment Details
                            </Typography>

                            <FormTimePicker
                                name="date"
                                label="Date"
                                type="date"
                                format="DD/MM/YYYY"
                                sx={{ mb: 2 }}
                                fullWidth
                                disablePast
                                InputLabelProps={{ shrink: true }}
                                rules={{
                                    required: 'Please enter date',
                                    validate: (v) => checkPastDate(v) || 'Date cannot be in the past',
                                }}
                            />

                            <FormTimePicker
                                name="time"
                                label="Time"
                                type="time"
                                minutesStep={15}
                                sx={{ mb: 2 }}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                rules={{
                                    required: 'Please enter time',
                                    validate: (v) =>
                                        date.hour(v.hour()).minute(v.minute()).second(0).diff(dayjs(), 'hour') >= 2 ||
                                        'Please select a time at least 2 hours from now.',
                                }}
                            />
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                {['At-Home Service', 'In-Store Visit'].map((label, index) => (
                                    <Chip
                                        key={index}
                                        label={label}
                                        color="primary"
                                        variant={servingType === index ? 'filled' : 'outlined'}
                                        sx={{ height: 28 }}
                                        onClick={() => setServingType(index)}
                                    />
                                ))}
                            </Box>
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
                                <FormSelect
                                    name="branch"
                                    fullWidth
                                    options={branches.map((b) => ({ value: b.id, label: b.location }))}
                                    sx={{ mb: 2 }}
                                    label="Branch"
                                />
                            )}
                            <FormInput
                                name="note"
                                label="Note"
                                sx={{ mb: 2 }}
                                fullWidth
                                slotProps={{ inputLabel: { shrink: true } }}
                                placeholder="Any secial requests or information"
                                multiline
                                rows={3}
                            />
                        </Box>

                        {/* Selected Items */}
                        <Box
                            sx={{
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
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
                                <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 2 }}>
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
                                <Box sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
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

                        <Button type="submit" variant="contained" fullWidth>
                            Confirm Booking
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </Box>
    );
};

export default AppointmentPage;
