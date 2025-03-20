import { Box, Button, Typography } from '@mui/material';
import { userServices } from '@services/userServices';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { checkIsAlphabetic, checkIsEmail, checkIsPhoneNumber } from '@src/utils/validators';
import { memo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProfileTab = () => {
    const { userInfo } = useAuth();
    const methods = useForm({
        defaultValues: userInfo,
        mode: 'all',
    });

    const handleSubmit = useCallback(async (data) => {
        try {
            console.log(data);
            await userServices.changeUserInfo(data);
            toast.success('Update info successfully');
        } catch {
            toast.error('Update info failed');
        }
    }, []);

    return (
        <>
            <Typography fontWeight={500} sx={{ m: 1, mb: 2 }}>
                Personal Information
            </Typography>

            {/* Form nhập thông tin */}
            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 2 }}
                >
                    <FormInput
                        label="Name"
                        name="name"
                        fullWidth
                        rules={{
                            required: 'Please enter your name',
                            validate: (v) => checkIsAlphabetic(v) || 'Invalid Name',
                        }}
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        fullWidth
                        rules={{
                            required: 'Please enter your email',
                            validate: (v) => checkIsEmail(v) || 'Invalid Email',
                        }}
                    />
                    <FormInput
                        label="Phone"
                        name="phoneNumber"
                        fullWidth
                        rules={{ validate: (v) => checkIsPhoneNumber(v) || 'Invalid Phone Number' }}
                    />
                    <FormInput label="Address" name="address" fullWidth />
                    <Button
                        variant="contained"
                        color="brand"
                        size="small"
                        type="submit"
                        sx={{ textTransform: 'none', float: 'right' }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </FormProvider>
        </>
    );
};

export default memo(ProfileTab);
