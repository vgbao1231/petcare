import { Search } from '@mui/icons-material';
import { Box, Button, Card, Checkbox, Chip, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ServiceCard from './ServiceCard';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { checkPastDate } from '@src/utils/validators';
import FormTimePicker from '@src/components/reuseable/FormRHF/FormTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useBranch } from '@src/hooks/useBranch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serviceServices } from '@services/serviceServices';
import { toast } from 'react-toastify';
import TermsDialog from './TermsDialog';
import { useNavigate } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentPage = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { userInfo } = useAuth();
    const [servingType, setServingType] = useState(0);
    const methods = useForm({ mode: 'all' });
    const date = methods.watch('date');
    const { branches, selectedBranch, setSelectedBranch } = useBranch();
    const queryClient = useQueryClient();
    methods.setValue('branch_id', selectedBranch);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const total = selectedServices.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { mutate: createAppointment } = useMutation({
        mutationFn: (data) => appointmentServices.createAppointment(data),
        onSuccess: (data, variables) => {
            toast.success('Appointment created successfully');
            queryClient.invalidateQueries(['appointments']);
            navigate('/booking-success', { state: { data, variables, selectedServices, total } });
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

    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: serviceServices.getAllServices,
        onError: () => toast.error('Failed to load services'),
    });

    return (
        <Box sx={{ pt: 13, px: { xs: 2, sm: 4, md: 10, lg: 20 }, pb: 5 }}>
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
                        placeholder="Search services..."
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

                    {/* Danh sách dịch vụ khả dụng */}
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
                                Available Services
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
                            {services
                                .filter(({ name }) => name.toUpperCase().includes(searchValue.toUpperCase()))
                                .map((service, i) => (
                                    <ServiceCard
                                        key={service.serviceId}
                                        service={service}
                                        index={i}
                                        setSelectedServices={setSelectedServices}
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
                                mb: 2,
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
                                    validate: (v) => {
                                        const now = dayjs();
                                        const selected = dayjs(date).hour(v.hour()).minute(v.minute());

                                        return selected.isBefore(now, 'day')
                                            ? 'Time cannot be in the past'
                                            : selected.isSame(now, 'day') && selected.diff(now, 'hour') < 2
                                              ? 'Please select a time at least 2 hours from now.'
                                              : true;
                                    },
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
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={1}>
                                Selected Items
                            </Typography>

                            {selectedServices.length === 0 && (
                                <Typography
                                    id="no-selected-item"
                                    variant="body2"
                                    sx={{ m: 1, color: 'text.secondary', textAlign: 'center' }}
                                >
                                    No items selected yet
                                </Typography>
                            )}

                            {selectedServices.length !== 0 && (
                                <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 2 }}>
                                    <Typography fontSize={12} mb={0.5} color="text.secondary">
                                        Services
                                    </Typography>
                                    <Box
                                        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                                        data-testid="selectedItems"
                                    >
                                        {selectedServices.map((service, i) => (
                                            <ServiceCard
                                                key={service.serviceId}
                                                index={i}
                                                service={service}
                                                selected
                                                setSelectedServices={setSelectedServices}
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
                                <Typography variant="body2">${total.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={500}>Total Amount:</Typography>
                                <Typography fontWeight={500}>${total.toFixed(2)}</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2}>
                            <Card variant="outlined" sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center' }}>
                                <Checkbox
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    size="small"
                                    id="acceptTerms"
                                />
                                <Box flex={1}>
                                    <Typography fontSize={13} sx={{ fontWeight: 500, cursor: 'pointer' }}>
                                        I agree to the <TermsDialog />
                                    </Typography>
                                    <Typography fontSize={10} color="text.secondary">
                                        By checking this box, you acknowledge that you have read and agree to our terms
                                        and conditions.
                                    </Typography>
                                </Box>
                            </Card>

                            <Button
                                id="submitButton"
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!acceptTerms}
                            >
                                Confirm Booking
                            </Button>
                        </Box>
                    </Box>
                </FormProvider>
            </Box>
        </Box>
    );
};

export default AppointmentPage;
