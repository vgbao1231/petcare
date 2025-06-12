import { PersonOutlineOutlined, Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import ProductCard from './ProductCard';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { checkPastDate } from '@src/utils/validators';
import FormTimePicker from '@src/components/reuseable/FormRHF/FormTimePicker';
import dayjs from 'dayjs';
import { useBranch } from '@src/hooks/useBranch';
import { productServices } from '@services/productServices';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userServices } from '@services/userServices';
import { orderServices } from '@services/orderServices';

const AddOrderDialog = ({ open, onClose }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const methods = useForm({ mode: 'all' });
    const date = methods.watch('date');
    const { branches, selectedBranch } = useBranch();
    const queryClient = useQueryClient();

    const subTotal = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { mutate: createOrder } = useMutation({
        mutationFn: (data) => orderServices.createOrder(data),
        onSuccess: () => {
            toast.success('Create order successfully');
            queryClient.invalidateQueries(['orders']);
        },
    });

    const handleSubmit = (data) => {
        const { date, time, ...rest } = data;

        const pickup_time = dayjs(date).hour(time.hour()).minute(time.minute()).second(0).toISOString();

        const productPayload = selectedProducts.map((item) => ({
            product_id: item.id,
            product_name: item.name,
            product_type: item.productType,
            quantity: item.quantity,
            unit_price: item.price,
        }));

        if (productPayload.length > 0) {
            createOrder({ ...rest, items: productPayload, pickup_time });
        }
    };

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => productServices.getAllProduct(),
        onError: () => toast.error('Failed to load products'),
    });

    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: () => userServices.getAllCustomers(),
        keepPreviousData: true,
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            slotProps={{ paper: { sx: { backgroundImage: 'none' } } }}
        >
            <DialogTitle>Add Order</DialogTitle>
            <DialogContent sx={{ p: 4 }}>
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
                        {/* Search bar */}
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="Search products..."
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
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'divider',
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    overflowY: 'auto',
                                    maxHeight: 420,
                                }}
                            >
                                {products
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
                            {/* Order Details */}
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
                                    Order Details
                                </Typography>

                                <Controller
                                    name="customer_id"
                                    control={methods.control}
                                    rules={{ required: 'Customer is required' }}
                                    render={({ field, fieldState }) => {
                                        const selectedCustomer = customers.find((u) => u.userId === field.value);
                                        return (
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                sx={{ mb: 2 }}
                                                error={!!fieldState.error}
                                            >
                                                <InputLabel shrink>Customer</InputLabel>
                                                <Select
                                                    label="Customer"
                                                    {...field}
                                                    displayEmpty
                                                    notched
                                                    renderValue={() =>
                                                        selectedCustomer ? (
                                                            <Box>
                                                                <Typography
                                                                    lineHeight={1.2}
                                                                    fontSize={14}
                                                                    fontWeight={500}
                                                                >
                                                                    {selectedCustomer.name}
                                                                </Typography>
                                                                <Typography
                                                                    lineHeight={1.2}
                                                                    fontSize={12}
                                                                    color="text.secondary"
                                                                >
                                                                    {selectedCustomer.email}
                                                                </Typography>
                                                            </Box>
                                                        ) : (
                                                            <Typography color="text.secondary">
                                                                Select Customer
                                                            </Typography>
                                                        )
                                                    }
                                                >
                                                    {customers.map((u) => (
                                                        <MenuItem key={u.userId} value={u.userId}>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <PersonOutlineOutlined
                                                                    fontSize="small"
                                                                    color="primary"
                                                                />
                                                                <Box>
                                                                    <Typography fontSize={12} fontWeight={500}>
                                                                        {u.name}
                                                                    </Typography>
                                                                    <Typography fontSize={11} color="text.secondary">
                                                                        {u.email}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText sx={{ fontSize: 14 }}>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        );
                                    }}
                                />

                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <FormTimePicker
                                        id="date"
                                        name="date"
                                        label="Date"
                                        type="date"
                                        format="DD/MM/YYYY"
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
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        rules={{
                                            required: 'Please enter time',
                                            validate: (v) =>
                                                date
                                                    .hour(v.hour())
                                                    .minute(v.minute())
                                                    .second(0)
                                                    .diff(dayjs(), 'hour') >= 2 ||
                                                'Please select a time at least 2 hours from now.',
                                        }}
                                    />
                                </Box>

                                <FormSelect
                                    defaultValue={selectedBranch}
                                    id="branch"
                                    name="branch_id"
                                    fullWidth
                                    options={branches.map((b) => ({ value: b.id, label: b.location }))}
                                    sx={{ mb: 2 }}
                                    rules={{ required: 'Please select branch' }}
                                    label="Branch"
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

                                {selectedProducts.length === 0 && (
                                    <Typography
                                        variant="body2"
                                        sx={{ m: 1, color: 'text.secondary', textAlign: 'center' }}
                                    >
                                        No items selected yet
                                    </Typography>
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

                            <Button type="submit" variant="contained" fullWidth sx={{ textTransform: 'none' }}>
                                Add Order
                            </Button>
                        </Box>
                    </FormProvider>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddOrderDialog;
