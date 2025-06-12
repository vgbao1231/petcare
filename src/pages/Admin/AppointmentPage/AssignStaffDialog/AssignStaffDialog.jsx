import { CalendarMonthOutlined, Close, LocationOnOutlined, PersonOutlineOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { appointmentServices } from '@services/appointmentServices';
import { userServices } from '@services/userServices';
import { useBranch } from '@src/hooks/useBranch';
import { formatUnixToLocale } from '@src/utils/formatters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AssignStaffDialog({ open, onClose, defaultValues }) {
    const queryClient = useQueryClient();
    const methods = useForm({ mode: 'all' });
    const { branches } = useBranch();

    const { mutate: assignStaff } = useMutation({
        mutationFn: (data) => appointmentServices.assignStaff(data),
        onSuccess: () => {
            toast.success('Assign staff for appointment successfully');
            queryClient.invalidateQueries(['appointments']);
        },
        onError: () => {
            toast.error('Failure to assign staff for appointment');
        },
    });

    const handleSubmit = (data) => {
        const formData = {
            appointment_id: String(defaultValues.appointment.id),
            employee_id: String(data.employee_id),
        };
        assignStaff(formData);
    };

    console.log(defaultValues);

    const { data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: () => userServices.getAllEmployees(),
        keepPreviousData: true,
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        Assign Staff
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent dividers>
                        <Typography variant="subtitle1" gutterBottom>
                            Select a staff member to assign this appointment.
                        </Typography>

                        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                    size="small"
                                    label={`APT · #${defaultValues.appointment.id}`}
                                    variant="outlined"
                                />
                                <Typography variant="body2">{defaultValues.customer_name}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarMonthOutlined fontSize="small" />
                                <Typography variant="body2">
                                    {formatUnixToLocale(defaultValues.appointment.scheduled_time.seconds)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnOutlined fontSize="small" />
                                {defaultValues.appointment.customer_address ? (
                                    <Typography variant="body2">
                                        {defaultValues.appointment.customer_address}
                                    </Typography>
                                ) : (
                                    <Typography variant="body2">
                                        {branches.find((b) => b.id === defaultValues.appointment.branch_id)?.name} -{' '}
                                        {branches.find((b) => b.id === defaultValues.appointment.branch_id)?.location}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Controller
                            name="employee_id"
                            control={methods.control}
                            rules={{ required: 'Employee is required' }}
                            render={({ field, fieldState }) => {
                                const Employee = employees.find((u) => u.userId === field.value);
                                return (
                                    <FormControl fullWidth size="small" sx={{ mb: 2 }} error={!!fieldState.error}>
                                        <InputLabel shrink>Employee</InputLabel>
                                        <Select
                                            label="Employee"
                                            {...field}
                                            displayEmpty
                                            notched
                                            value={field.value ?? ''}
                                            renderValue={() =>
                                                Employee ? (
                                                    <Box>
                                                        <Typography lineHeight={1.2} fontSize={14} fontWeight={500}>
                                                            {Employee.name}
                                                        </Typography>
                                                        <Typography
                                                            lineHeight={1.2}
                                                            fontSize={12}
                                                            color="text.secondary"
                                                        >
                                                            {Employee.email}
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <Typography color="text.secondary">Select Employee</Typography>
                                                )
                                            }
                                        >
                                            {employees.map((u) => (
                                                <MenuItem key={u.userId} value={u.userId}>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <PersonOutlineOutlined fontSize="small" color="primary" />
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
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                            Assign
                        </Button>
                    </DialogActions>
                </Box>
            </FormProvider>
        </Dialog>
    );
}
