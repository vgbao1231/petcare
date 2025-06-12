import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Stack } from '@mui/material';
import { userServices } from '@services/userServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import FormSelect from '@src/components/reuseable/FormRHF/FormSelect';
import { useBranch } from '@src/hooks/useBranch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditUserDialog = ({ open, onClose, defaultValues }) => {
    const methods = useForm({ mode: 'onChange', defaultValues });
    const { branchOptions } = useBranch();
    const queryClient = useQueryClient();
    console.log(defaultValues);

    const { mutate: updateUserInfo } = useMutation({
        mutationFn: (data) => userServices.updateUserInfo(defaultValues.userId, data),
        onError: () => toast.error('Failed to update user'),
        onSuccess: () => {
            toast.success('Update user successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleSubmit = methods.handleSubmit((data) => {
        updateUserInfo(data);
        onClose();
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
                            <FormInput label="Address" name="address" fullWidth />

                            <Stack direction="row" spacing={2}>
                                <FormSelect
                                    label="Role"
                                    name="roleId"
                                    sx={{ flex: 1 }}
                                    options={[
                                        { label: 'Admin', value: 3 },
                                        { label: 'Employee', value: 2 },
                                        { label: 'Customer', value: 1 },
                                    ]}
                                />

                                <FormSelect
                                    label="Branch"
                                    name="branchId"
                                    sx={{ flex: 1 }}
                                    options={[{ label: 'No Branch', value: 0 }, ...branchOptions]}
                                />
                            </Stack>
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" sx={{ textTransform: 'none' }}>
                            Update User
                        </Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
};

export default EditUserDialog;
