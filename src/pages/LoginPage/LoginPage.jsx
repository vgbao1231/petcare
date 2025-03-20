import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    createTheme,
    CssBaseline,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { authServices } from '@services/authServices';
import loginBgr from '@src/assets/login-background/login3.png';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { useAuth } from '@src/hooks/useAuth';
import { centerSx } from '@src/theme';
import { checkIsEmail } from '@src/utils/validators';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
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

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const methods = useForm({ mode: 'all' });
    const { setToken } = useAuth();
    const location = useLocation();

    const handleSubmit = useCallback(
        async (data) => {
            try {
                const res = await authServices.login(data);
                setToken(res.token);
                toast.success('Login Successfully!');
            } catch {
                toast.error('Login Failed!');
            }
        },
        [setToken]
    );

    useEffect(() => {
        if (location.state?.isVerified !== undefined) {
            location.state.isVerified
                ? toast.success('Verification successful! Please log in.')
                : toast.error('Verification failed! Invalid token.');
        }
    }, [location]);

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
                    <Typography color="text.secondary" gutterBottom>
                        WELCOME TO PETCARE
                    </Typography>
                    <Typography variant="h4" fontWeight={700} my={2}>
                        Log In to Your Account
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
                                sx={{ mb: methods.formState.errors.email ? 0.5 : 2.5 }}
                                slotProps={{ htmlInput: { sx: { fontSize: 17, p: 1.8 } } }}
                                placeholder="Enter your Email"
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
                                placeholder="Enter your Password"
                                rules={{ required: 'Please enter your password' }}
                                sx={{ mb: methods.formState.errors.password ? 0 : 1 }}
                            />
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box {...centerSx}>
                                    <Checkbox size="small" />
                                    <Typography variant="span" ml={0.5}>
                                        Remember Me
                                    </Typography>
                                </Box>
                                <Link href="/forgot-password" underline="hover" color="text.secondary">
                                    Forgot Password?
                                </Link>
                            </Box>

                            <Button fullWidth variant="contained" color="black" sx={{ mt: 2, py: 1 }} type="submit">
                                Continue
                            </Button>
                        </Box>
                    </FormProvider>

                    {/* Divider */}
                    <Box sx={{ ...centerSx }}>
                        <Box sx={{ borderTop: '1px solid #ccc', width: 80 }}></Box>
                        <Typography variant="span" color="text.secondary" mx={1} my={3}>
                            or continue with
                        </Typography>
                        <Box sx={{ borderTop: '1px solid #ccc', width: 80 }}></Box>
                    </Box>

                    {/* Other login methods */}
                    <Box sx={{ ...centerSx, gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        ></path>
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        ></path>
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                    </svg>
                                </SvgIcon>
                            }
                        >
                            Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                    >
                                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                                        <path
                                            fill="#fff"
                                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                                        ></path>
                                    </svg>
                                </SvgIcon>
                            }
                        >
                            Facebook
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="center" mt={3}>
                        <Typography color="text.secondary">
                            {"Don't have an account? "}
                            <Link href="/register" underline="hover" color="text.secondary">
                                Sign up
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

export default LoginPage;
