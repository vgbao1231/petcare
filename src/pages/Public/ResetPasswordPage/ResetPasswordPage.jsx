import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    createTheme,
    CssBaseline,
    IconButton,
    InputAdornment,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { userServices } from '@services/userServices';
import loginBgr from '@src/assets/login-background/login3.png';
import FormInput from '@src/components/reuseable/FormRHF/FormInput';
import { getTokenPayload } from '@src/utils/helpers';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

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

const ResetPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const methods = useForm({ mode: 'all' });
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const navigate = useNavigate();

    const handleSubmit = useCallback(
        async (data) => {
            try {
                setLoading(true);
                delete data.confirmPassword;
                await userServices.resetPassword({ ...data, token, userId: getTokenPayload(token).user_id });
                navigate('/login', { state: { isReseted: true } });
            } catch {
                // navigate('/forgot-password', { state: { isReseted: false } });
            } finally {
                setLoading(false);
            }
        },
        [navigate, token]
    );

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

                {/* Reset Password Form */}
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
                        Setup new password
                    </Typography>
                    <Typography color="text.secondary" mt={1} mb={3}>
                        Your previous password has been reseted. Please set a new password for your account.
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                            <FormInput
                                fullWidth
                                size="medium"
                                name="newPassword"
                                label="New Password"
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
                                rules={{ validate: (v) => v === currentPass || "Password does't match" }}
                                sx={{ mb: methods.formState.errors.password ? 0 : 1 }}
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

export default ResetPasswordPage;
