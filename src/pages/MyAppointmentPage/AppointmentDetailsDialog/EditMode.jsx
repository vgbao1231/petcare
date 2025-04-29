import { Close, Edit } from '@mui/icons-material';
import { Box, Button, Chip, DialogActions, DialogContent, Typography } from '@mui/material';
import { branchServices } from '@services/branchServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import FormTimePicker from '@src/components/reuseable/FormRHF/FormTimePicker';
import { checkPastDate } from '@src/utils/validators';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const EditMode = ({ setEditMode }) => {
    const [servingType, setServingType] = useState(0);
    const methods = useForm({ mode: 'all' });
    const date = methods.watch('date');

    const { data: branchesData } = useQuery({
        queryKey: ['branches'],
        queryFn: () => branchServices.getAllBranches(),
    });

    const branches = useMemo(
        () =>
            branchesData?.map((b) => ({
                value: b.id,
                label: b.location,
            })) || [],
        [branchesData]
    );

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => console.log(data),
        onSuccess: () => {
            setEditMode(false);
            console.log('Thành công!');
        },
        onError: () => console.log('Lỗi'),
    });

    return (
        <FormProvider {...methods}>
            <Box component="form" onSubmit={methods.handleSubmit(mutate)}>
                <DialogContent sx={{ pb: 0 }}>
                    <Typography variant="body2" fontWeight={500} mb={1}>
                        Appointment Type
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        {['At-Home Service', 'In-Store Visit'].map((label, index) => (
                            <Chip
                                key={index}
                                label={label}
                                color="primary"
                                variant={servingType === index ? 'filled' : 'outlined'}
                                size="small"
                                onClick={() => setServingType(index)}
                            />
                        ))}
                    </Box>
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
                        sx={{ mb: 1 }}
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        placeholder="Any secial requests or information"
                        rows={2}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                    <Button size="small" variant="outlined" startIcon={<Close />} sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        startIcon={<Edit />}
                        sx={{ textTransform: 'none' }}
                        type="submit"
                        loading={isPending}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Box>
        </FormProvider>
    );
};

export default EditMode;
