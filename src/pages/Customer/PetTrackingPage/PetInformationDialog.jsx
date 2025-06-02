import { AddCircleOutlineOutlined, FileUploadOutlined, SaveOutlined } from '@mui/icons-material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid2,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { petServices } from '@services/petServices';
import FormFile from '@src/components/reuseable/FormRHF/FormFile';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx } from '@src/theme';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const PetInformationDialog = ({ formData, open, onClose }) => {
    const methods = useForm({ defaultValues: formData, mode: 'all' });
    const [previewUrl, setPreviewUrl] = useState();
    const { userInfo } = useAuth();
    const queryClient = useQueryClient();

    const handleFileChange = (file) => {
        setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
    };

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
            delete newData.image;
            createPet({
                ...newData,
                owner_id: '' + userInfo.userId,
                age: Number(newData.age),
                weight: Number(newData.weight),
            });
        }
        onClose();
    };

    const formFields = [
        { name: 'name', label: 'Pet Name', placeholder: 'Enter pet name', type: 'text' },
        { name: 'age', label: 'Age', placeholder: 'Enter age', type: 'number' },
        { name: 'species', label: 'Species', placeholder: 'Enter species', type: 'text' },
        { name: 'color', label: 'Color', placeholder: 'Enter color', type: 'text' },
        { name: 'weight', label: 'Weight', placeholder: 'Enter weight (kg)', type: 'number' },
        { name: 'size', label: 'Size', placeholder: 'Enter size', type: 'text' },
    ];

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 500, borderRadius: 2 } } }}>
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                    <DialogTitle>{formData ? 'Edit Pet Information' : 'Add New Pet'}</DialogTitle>
                    <DialogContent sx={{ py: 0 }}>
                        <Box {...centerSx} flexDirection="column" gap={2} mb={2}>
                            <Avatar src={previewUrl} sx={{ width: 100, height: 100 }} />
                            <FormFile
                                color="common"
                                size="small"
                                label="Upload Image"
                                name="image"
                                variant="outlined"
                                sx={{ textTransform: 'none' }}
                                startIcon={<FileUploadOutlined />}
                                onFileChange={handleFileChange}
                            />
                        </Box>
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
