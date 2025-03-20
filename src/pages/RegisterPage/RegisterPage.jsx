import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    createTheme,
    CssBaseline,
    IconButton,
    InputAdornment,
    Link,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { authServices } from '@services/authServices';
import loginBgr from '@src/assets/login-background/login3.png';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { checkIsAlphabetic, checkIsEmail } from '@src/utils/validators';
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

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const methods = useForm({ mode: 'all' });

    const handleSubmit = useCallback(async (data) => {
        try {
            await authServices.register(data);
            toast.success('Register Successfully! Please check your email');
        } catch {
            toast.error('Register Failed!');
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

                {/* Login Form */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 100,
                        right: 180,
                        bgcolor: 'rgba(255,255,255,0.8)',
                        width: 500,
                        p: 4,
                        borderRadius: 5,
                        backdropFilter: 'blur(1px)',
                    }}
                >
                    <Typography color="text.secondary" gutterBottom>
                        {"LET'S GET YOU STARTED"}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} my={2}>
                        Create an Account
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                            <Box display="flex" gap={2}>
                                <FormInput
                                    fullWidth
                                    size="medium"
                                    name="lastName"
                                    label="Last Name"
                                    rules={{
                                        required: 'Please fill in the blanks',
                                        validate: (v) => checkIsAlphabetic(v) || 'Invalid Name',
                                    }}
                                    sx={{ mb: methods.formState.errors.lastName ? 0.5 : 2.5 }}
                                    slotProps={{ htmlInput: { sx: { fontSize: 17, p: 1.8 } } }}
                                />
                                <FormInput
                                    fullWidth
                                    size="medium"
                                    name="firstName"
                                    label="First Name"
                                    rules={{
                                        required: 'Please fill in the blanks',
                                        validate: (v) => checkIsAlphabetic(v) || 'Invalid Name',
                                    }}
                                    sx={{ mb: methods.formState.errors.firstName ? 0.5 : 2.5 }}
                                    slotProps={{ htmlInput: { sx: { fontSize: 17, p: 1.8 } } }}
                                />
                            </Box>
                            <FormInput
                                fullWidth
                                size="medium"
                                name="email"
                                label="Email"
                                rules={{
                                    required: 'Please enter your email',
                                    validate: (v) => checkIsEmail(v) || 'Invalid Email',
                                }}
                                sx={{ mb: methods.formState.errors.email ? 0.5 : 2.5 }}
                                slotProps={{ htmlInput: { sx: { fontSize: 17, p: 1.8 } } }}
                            />
                            <FormInput
                                fullWidth
                                size="medium"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                slotProps={{
                                    htmlInput: { sx: { fontSize: 17, p: 1.8 } },
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                rules={{ required: 'Please enter your password' }}
                                sx={{ mb: methods.formState.errors.password ? 0.5 : 2.5 }}
                                onChange={(e) => setCurrentPass(e.target.value)}
                            />

                            <FormInput
                                fullWidth
                                size="medium"
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                slotProps={{
                                    htmlInput: { sx: { fontSize: 17, p: 1.8 } },
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                rules={{
                                    validate: (v) => v === currentPass || "Password does't match",
                                }}
                                sx={{ mb: methods.formState.errors.password ? 0 : 1 }}
                            />

                            <Button fullWidth variant="contained" color="black" sx={{ mt: 2, py: 1 }} type="submit">
                                Continue
                            </Button>
                        </Box>
                    </FormProvider>

                    <Box display="flex" justifyContent="center" mt={3}>
                        <Typography color="text.secondary">
                            {'Already have an account? '}
                            <Link href="/login" underline="hover" color="text.secondary">
                                Log In
                            </Link>
                        </Typography>
                    </Box>
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

export default RegisterPage;
