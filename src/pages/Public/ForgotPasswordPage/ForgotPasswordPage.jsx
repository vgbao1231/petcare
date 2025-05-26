import { Box, Button, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { userServices } from '@services/userServices';
import loginBgr from '@src/assets/login-background/login3.png';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { checkIsEmail } from '@src/utils/validators';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        black: {
            main: '#000000',
            dark: '#232323',
            light: '#232323',
            contrastText: '#ffffff',
        },
    },
});

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const methods = useForm({ mode: 'all' });

    const handleSubmit = useCallback(async (data) => {
        try {
            setLoading(true);
            await userServices.forgotPassword(data);
            toast.success('Please check your email!');
        } catch (e) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                {/* Background */}
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: `url(${loginBgr}) center/cover no-repeat`,
                    }}
                ></Box>

                {/* Forgot Password Form */}
                <Box
                    sx={{
                        transition: 'width 0.3s',
                        position: 'absolute',
                        top: '50vh',
                        transform: { xs: 'translate(50%, -50%)', md: 'translateY(-50%)' },
                        right: { xs: '50vw', md: 180 },
                        bgcolor: 'rgba(255,255,255,0.8)',
                        width: { xs: '90%', sm: '75%', md: 500 },
                        p: 4,
                        borderRadius: 5,
                        backdropFilter: 'blur(1px)',
                    }}
                >
                    <Typography variant="h4" fontWeight={700}>
                        Forgot your password?
                    </Typography>
                    <Typography color="text.secondary" mt={1} mb={3}>
                        Don’t worry, happens to all of us. Enter your email below to recover your password
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                            <FormInput
                                fullWidth
                                size="medium"
                                name="email"
                                label="Email"
                                rules={{
                                    required: 'Please enter your email',
                                    validate: (v) => checkIsEmail(v) || 'Invalid Email',
                                }}
                                sx={{ mb: methods.formState.errors.email ? 0.5 : 1.5 }}
                                slotProps={{ htmlInput: { sx: { fontSize: 17, p: 1.8 } } }}
                                placeholder="Enter your Email"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="black"
                                loading={loading}
                                loadingPosition="end"
                                sx={{ mt: 2, py: 1 }}
                                type="submit"
                            >
                                Continue
                            </Button>
                        </Box>
                    </FormProvider>
                </Box>

                {/* Introduction */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: 80,
                        width: 400,
                        p: 2,
                        bgcolor: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: 3,
                        opacity: { xs: '0', md: '1' },
                        transition: 'opacity 0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="h6" color="#fff" fontSize={18} fontWeight={700}>
                        {"PetCare Center - Your Pet's Trusted Companion"}
                    </Typography>
                    <Typography variant="body2" color="#fff">
                        Explore a world dedicated to pet lovers. Share moments, find expert pet care tips, and connect
                        with fellow pet enthusiasts.
                    </Typography>
                    <Box display="flex" justifyContent="space-around" color="#fff">
                        <Box>
                            <Typography variant="h6" fontWeight={700} textAlign="center">
                                10K+
                            </Typography>
                            <Typography variant="body2">Customers</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={700} textAlign="center">
                                10K+
                            </Typography>
                            <Typography variant="body2">Appointments</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={700} textAlign="center">
                                50+
                            </Typography>
                            <Typography variant="body2">Certified Experts</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default ForgotPasswordPage;
