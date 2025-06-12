import { AddCircleOutlineOutlined, SaveOutlined } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid2, Typography, Box } from '@mui/material';
import { petServices } from '@services/petServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

const PetInformationDialog = ({ formData, open, onClose }) => {
    const methods = useForm({ defaultValues: formData, mode: 'all' });
    const { userInfo } = useAuth();
    const queryClient = useQueryClient();

    const { mutate: createPet } = useMutation({
        mutationFn: (data) => petServices.createPet(data),
        onError: () => toast.error('Failed to create new pet'),
        onSuccess: () => {
            toast.success('Create new pet successfully');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
    });

    const { mutate: updatePet } = useMutation({
        mutationFn: (data) => petServices.updatePet(data),
        onError: () => toast.error('Failed to update pet'),
        onSuccess: () => {
            toast.success('Update pet successfully');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
    });

    const handleSubmit = (newData) => {
        if (formData) {
            // Edit
            updatePet({
                ...newData,
                owner_id: '' + userInfo.userId,
                age: Number(newData.age),
                weight: Number(newData.weight),
            });
        } else {
            // Add
            // delete newData.image;
            createPet({
                ...newData,
                owner_id: '' + userInfo.userId,
                weight: Number(newData.weight),
            });
        }
        onClose();
    };

    const formFields = [
        { name: 'name', label: 'Pet Name', placeholder: 'Enter pet name', type: 'text' },
        { name: 'dob', label: 'Date of Birth', placeholder: 'Enter dob', type: 'date' },
        { name: 'species', label: 'Species', placeholder: 'Enter species', type: 'text' },
        { name: 'color', label: 'Color', placeholder: 'Enter color', type: 'text' },
        { name: 'weight', label: 'Weight', placeholder: 'Enter weight (kg)', type: 'number' },
        { name: 'identity_mark', label: 'Identity Mark ', placeholder: 'Enter indentity mark', type: 'text' },
    ];

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 500, borderRadius: 2 } } }}>
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                    <DialogTitle>{formData ? 'Edit Pet Information' : 'Add New Pet'}</DialogTitle>
                    <DialogContent sx={{ py: 0 }}>
                        <Grid2 container spacing={2}>
                            {formFields.map(({ name, label, placeholder, type }) => (
                                <Grid2 key={name} size={6}>
                                    <Typography variant="body2" fontWeight={500} mb={1}>
                                        {label}
                                    </Typography>
                                    <FormInput
                                        name={name}
                                        placeholder={placeholder}
                                        type={type}
                                        fullWidth
                                        autoFocus={name === 'name'} // chỉ input đầu tiên focus
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, gap: 1 }}>
                        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                        {formData ? (
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                                startIcon={<SaveOutlined fontSize="small" />}
                            >
                                Save Changes
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                                startIcon={<AddCircleOutlineOutlined fontSize="small" />}
                            >
                                Add Pet
                            </Button>
                        )}
                    </DialogActions>
                </Box>
            </FormProvider>
        </Dialog>
    );
};

export default PetInformationDialog;
