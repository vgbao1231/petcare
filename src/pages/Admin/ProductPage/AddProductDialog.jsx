import { FileUploadOutlined } from '@mui/icons-material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    Button,
    DialogActions,
    Stack,
    Divider,
    FormControlLabel,
    Switch,
    Avatar,
    TextField,
} from '@mui/material';
import FormFile from '@src/components/reuseable/FormRHF/FormFile';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { useBranch } from '@src/hooks/useBranch';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

const AddProductDialog = ({ open, onClose }) => {
    const methods = useForm({ mode: 'all' });
    const { branches } = useBranch();

    const [previewUrl, setPreviewUrl] = useState();
    const handleFileChange = (file) => {
        setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{ paper: { sx: { backgroundImage: 'none' } } }}
        >
            <DialogTitle>Add Product</DialogTitle>
            <FormProvider {...methods}>
                <DialogContent>
                    <Stack spacing={2} pt={1}>
                        <FormInput label="Product Name" fullWidth name="name" />
                        <FormInput label="Description" fullWidth multiline minRows={2} name="description" />
                        <Stack direction="row" spacing={2}>
                            <FormInput label="Price ($)" name="price" sx={{ flex: 2 }} />
                            <FormSelect
                                sx={{ flex: 1 }}
                                label="Product Type"
                                name="productType"
                                options={[
                                    { label: 'Food', value: 'food' },
                                    { label: 'Accessory', value: 'accessory' },
                                    { label: 'Medicine', value: 'medicine' },
                                ]}
                            />
                        </Stack>

                        <FormControlLabel
                            control={
                                <Controller
                                    name="attachable"
                                    control={methods.control}
                                    render={({ field }) => <Switch size="small" {...field} checked={field.value} />}
                                />
                            }
                            label="Can be attached to services"
                        />

                        {/* Upload Image */}
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

                        <Divider />
                        <Typography fontWeight={600} variant="subtitle1">
                            Inventory by Branch
                        </Typography>

                        {branches.map((branch, index) => (
                            <Box
                                key={branch.id}
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0 }}
                            >
                                <Typography fontWeight={500}>{branch.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {branch.location}
                                </Typography>

                                <input
                                    type="hidden"
                                    value={branch.id}
                                    {...methods.register(`branches.${index}.branch_id`)}
                                />

                                {/* Input số lượng với TextField */}
                                <TextField
                                    type="number"
                                    label="Số lượng"
                                    size="small"
                                    sx={{ width: 100 }}
                                    {...methods.register(`branches.${index}.quantity`, { valueAsNumber: true })}
                                />
                            </Box>
                        ))}
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" type="submit">
                        Add Product
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
};

export default AddProductDialog;
