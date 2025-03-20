import { LockReset, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Typography } from '@mui/material';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { centerSx } from '@src/theme';
import { memo, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const SecurityTab = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const methods = useForm({ mode: 'all' });

    const handleSubmit = useCallback(() => {}, []);

    return (
        <>
            <Typography fontWeight={500} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, m: 1, mb: 2 }}>
                <LockReset />
                Change Password
            </Typography>

            {/* Form đổi mật khẩu */}
            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    sx={{ ...centerSx, flexDirection: 'column', gap: 2, px: 2 }}
                >
                    <FormInput
                        fullWidth
                        name="currentPassword"
                        label="Current Password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            edge="end"
                                        >
                                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        rules={{ required: 'Please enter your password' }}
                        onChange={(e) => setCurrentPass(e.target.value)}
                    />
                    <FormInput
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        rules={{ required: 'Please enter your password' }}
                        onChange={(e) => setCurrentPass(e.target.value)}
                    />

                    <FormInput
                        fullWidth
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        type="password"
                        rules={{ validate: (v) => v === currentPass || "New password doesn't match" }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        color="brand"
                        sx={{ py: 1, textTransform: 'none' }}
                        type="submit"
                    >
                        Send Verification Code
                    </Button>
                </Box>
            </FormProvider>
        </>
    );
};

export default memo(SecurityTab);
