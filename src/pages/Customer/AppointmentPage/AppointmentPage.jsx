import { Search } from '@mui/icons-material';
import { Box, Button, Chip, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import { orderServices } from '@services/orderServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ProductCard from './ProductCard';
import ServiceCard from './ServiceCard';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { checkPastDate } from '@src/utils/validators';
import FormTimePicker from '@src/components/reuseable/FormRHF/FormTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useBranch } from '@src/hooks/useBranch';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { serviceServices } from '@services/serviceServices';
import { productServices } from '@services/productServices';
import { toast } from 'react-toastify';

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentPage = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [itemTab, setItemTab] = useState(0); // 0: Mở ds sản phẩm, 1: Mở ds dịch vụ
    const [searchValue, setSearchValue] = useState('');
    const { userInfo } = useAuth();
    const [servingType, setServingType] = useState(0);
    const methods = useForm({ mode: 'all' });
    const date = methods.watch('date');
    const { branches, selectedBranch, setSelectedBranch } = useBranch();
    const queryClient = useQueryClient();
    methods.setValue('branch_id', selectedBranch);

    console.log(userInfo);

    const subTotal = [...selectedProducts, ...selectedServices].reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const { mutate: createOrder } = useMutation({
        mutationFn: (data) => orderServices.createOrder(data),
        onSuccess: () => {
            toast.success('Create order associated with appointment successfully');
            queryClient.invalidateQueries(['orders']);
        },
        onError: () => {
            toast.error('Failure to create order associated with appointment');
        },
    });

    const { mutate: createAppointment } = useMutation({
        mutationFn: (data) => appointmentServices.createAppointment(data),
        onSuccess: (appointmentRes, variables) => {
            toast.success('Appointment created successfully');
            queryClient.invalidateQueries(['appointments']);

            // Nếu có sản phẩm thì tạo order kèm theo
            if (selectedProducts.length > 0) {
                const orderPayload = {
                    appointment_id: appointmentRes.appointment_id,
                    branch_id: variables.branch_id || userInfo.branchId,
                    customer_id: variables.customer_id,
                    pickup_time: variables.scheduled_time,
                    items: selectedProducts.map((p) => ({
                        product_id: p.product_id,
                        product_name: p.name,
                        product_type: p.product_type,
                        quantity: p.quantity || 1,
                        unit_price: p.price,
                    })),
                };

                createOrder(orderPayload);
            }
        },
        onError: () => {
            toast.error('Failed to create appointment');
        },
    });

    const handleSubmit = (data) => {
        if (selectedServices.length === 0) {
            toast.error('Please select at least one service');
            return;
        }

        const { date, time, ...rest } = data;
        const scheduled_time = dayjs(date).hour(time.hour()).minute(time.minute()).second(0).toISOString();

        const servicePayload = {
            ...rest,
            customer_id: userInfo.userId,
            scheduled_time,
            branch_id: selectedBranch,
            services: selectedServices.map((s) => ({
                service_id: s.serviceId,
                quantity: s.quantity || 1,
            })),
        };

        if (servingType === 1) {
            delete servicePayload.customer_address;
        } else {
            delete servicePayload.branch_id;
        }

        createAppointment(servicePayload);
    };

    const [{ data: services = [] }, { data: products = [] }] = useQueries({
        queries: [
            {
                queryKey: ['services'],
                queryFn: serviceServices.getAllServices,
                onError: () => toast.error('Failed to load services'),
            },
            {
                queryKey: ['attachableProducts'],
                queryFn: productServices.getAllAttachableProduct,
                onError: () => toast.error('Failed to load products'),
            },
        ],
    });

    return (
        <Box sx={{ pt: 12, px: { xs: 2, sm: 4, md: 10, lg: 20 }, pb: 5 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 4, md: 3 },
                }}
            >
                {/* Left Panel */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        flex: 1,
                    }}
                >
                    {/* Các nút chọn thêm Services/Products */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[
                            { label: 'Services', value: 'serviceBtn' },
                            { label: 'Product', value: 'productBtn' },
                        ].map(({ label, value }, index) => (
                            <Button
                                data-selected={index === itemTab}
                                id={value}
                                key={index}
                                variant={index === itemTab ? 'contained' : 'outlined'}
                                fullWidth
                                onClick={() => setItemTab(index)}
                                sx={{ bgcolor: index === itemTab ? 'none' : '#fff' }}
                            >
                                Choose {label}
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    overflowY: 'auto',
                                    maxHeight: 420,
                                }}
                            >
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
                <FormProvider {...methods}>
                    <Box
                        component="form"
                        sx={{
                            width: { xs: '100%', sm: '100%', md: 440 },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                        onSubmit={methods.handleSubmit(handleSubmit)}
                    >
                        {/* Appointment Details */}
                        <Box
                            sx={{
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
                                p: { xs: 2, sm: 2, md: 2 },
                                px: { xs: 2, sm: 3 },
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Appointment Details
                            </Typography>

                            <FormTimePicker
                                id="date"
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
                                id="time"
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

                            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                                {[
                                    { label: 'At-Home Service', value: 'atHome' },
                                    { label: 'In-Store Visit', value: 'inStore' },
                                ].map(({ label, value }, index) => (
                                    <Chip
                                        id={value}
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
                                    id="address"
                                    name="customer_address"
                                    label="Address"
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    rules={{ required: 'Please enter your address' }}
                                    placeholder="Enter your address"
                                />
                            ) : (
                                <FormSelect
                                    onChange={(e, value) => setSelectedBranch(value)}
                                    id="branch"
                                    name="branch_id"
                                    fullWidth
                                    options={branches.map((b) => ({ value: b.id, label: b.location }))}
                                    sx={{ mb: 2 }}
                                    rules={{ required: 'Please select branch' }}
                                    label="Branch"
                                />
                            )}

                            <FormInput
                                id="note"
                                name="note"
                                label="Note"
                                sx={{ mb: 2 }}
                                fullWidth
                                slotProps={{ inputLabel: { shrink: true } }}
                                placeholder="Any special requests or information"
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
                                p: { xs: 2, sm: 2, md: 2 },
                                px: { xs: 2, sm: 3 },
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
                                <Typography fontWeight={500}>Total Amount:</Typography>
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
