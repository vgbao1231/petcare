import { FileUploadOutlined } from '@mui/icons-material';
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
import FormFile from '@src/components/reuseable/FormRHF/FormFile';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { centerSx } from '@src/theme';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const speciesList = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

const PetInformationDialog = ({ formData, open, onClose }) => {
    const methods = useForm({ defaultValues: formData, mode: 'all' });
    const [previewUrl, setPreviewUrl] = useState();

    const handleFileChange = (file) => {
        setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = () => {
        formData ? console.log('edit') : console.log('add');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 500, borderRadius: 2 } } }}>
            <DialogTitle>{formData ? 'Edit Pet Information' : 'Add New Pet'}</DialogTitle>
            <DialogContent sx={{ py: 0 }}>
                <FormProvider {...methods}>
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
                        <Grid2 size={6}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Pet Name
                            </Typography>
                            <FormInput name="name" placeholder="Enter pet name" fullWidth autoFocus />
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Species
                            </Typography>
                            <FormSelect
                                name="species"
                                fullWidth
                                options={speciesList.map((s, i) => ({ value: i, label: s }))}
                                placeholder="Select a species"
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Breed
                            </Typography>
                            <FormInput placeholder="Enter breed" name="breed" fullWidth />
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Color
                            </Typography>
                            <FormInput placeholder="Enter color" name="color" fullWidth />
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Weight
                            </Typography>
                            <FormInput placeholder="Enter weight (kg)" type="number" name="weight" fullWidth />
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Height
                            </Typography>
                            <FormInput placeholder="Enter height (cm)" type="number" name="height" fullWidth />
                        </Grid2>
                        <Grid2 size={12}>
                            <Typography variant="body2" fontWeight={500} mb={1}>
                                Identifier
                            </Typography>
                            <FormInput placeholder="Enter identifier" name="identifier" fullWidth multiline rows={3} />
                        </Grid2>
                    </Grid2>
                </FormProvider>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1 }}>
                <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" sx={{ textTransform: 'none' }}>
                    {formData ? 'Save Changes' : 'Add Pet'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PetInformationDialog;
