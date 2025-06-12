import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Stack } from '@mui/material';
import { userServices } from '@services/userServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddUserDialog = ({ open, onClose, defaultValues }) => {
    const methods = useForm({ mode: 'onChange', defaultValues });
    const queryClient = useQueryClient();

    const { mutate: createUser } = useMutation({
        mutationFn: (data) => userServices.createUser(data),
        onError: () => toast.error('Failed to update user'),
        onSuccess: () => {
            toast.success('Create user successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleSubmit = methods.handleSubmit((data) => {
        createUser(data);
        onClose(); // Đóng dialog sau khi submit
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{ paper: { sx: { backgroundImage: 'none' } } }}
        >
            <DialogTitle>Edit User</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={2} pt={1}>
                            <FormInput label="Name" name="name" fullWidth />
                            <FormInput label="Email" name="email" fullWidth />
                            <FormInput label="Phone Number" name="phoneNumber" fullWidth />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" sx={{ textTransform: 'none' }}>
                            Create User
                        </Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
};

export default AddUserDialog;
