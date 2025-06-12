import { FileUploadOutlined } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Stack, Avatar } from '@mui/material';
import { serviceServices } from '@services/serviceServices';
import FormFile from '@src/components/reuseable/FormRHF/FormFile';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ServiceDialog = ({ open, onClose, defaultValues }) => {
    const methods = useForm({ mode: 'all', defaultValues });
    const isEditMode = defaultValues?.serviceId;
    const queryClient = useQueryClient();

    const [previewUrl, setPreviewUrl] = useState(defaultValues?.imgUrl || '');
    const handleFileChange = (file) => {
        setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
    };

    const { mutate: createOrUpdateService } = useMutation({
        mutationFn: (data) =>
            isEditMode
                ? serviceServices.updateService(defaultValues.serviceId, data)
                : serviceServices.createService(data),
        onError: () => toast.error(`Failed to ${isEditMode ? 'add' : 'update'} service`),
        onSuccess: () => {
            toast.success(`${isEditMode ? 'Add' : 'update'} service successfully`);
            queryClient.invalidateQueries({ queryKey: ['services'] });
            onClose();
        },
    });

    const handleSubmit = methods.handleSubmit((data) => {
        createOrUpdateService(data);
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? 'Edit Service' : 'Add Service'}</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={2} pt={1}>
                            <FormInput label="Name" name="name" fullWidth />
                            <FormInput label="Description" name="description" multiline minRows={2} fullWidth />
                            <FormInput label="Price" name="price" type="number" fullWidth />
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar src={previewUrl} sx={{ width: 70, height: 70 }} variant="rounded" />
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
                            </Stack>
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" sx={{ textTransform: 'none' }}>
                            {isEditMode ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
};

export default ServiceDialog;
