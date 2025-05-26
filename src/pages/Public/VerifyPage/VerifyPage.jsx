import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { authServices } from '@services/authServices';
import { centerSx } from '@src/theme';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                await authServices.verify(token);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                navigate('/login', { state: { isVerified: true } }); // Chuyển state sang login
            } catch {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        };

        if (token) verify();
    }, [token, navigate]);

    return (
        <Box sx={{ width: 1, height: '100vh', ...centerSx, bgcolor: 'grey.200' }}>
            <Paper
                sx={{ bgcolor: 'background.paper', p: 4, px: 8, borderRadius: 3, ...centerSx, flexDirection: 'column' }}
                elevation={2}
            >
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Verifying your email
                </Typography>
                <Typography color="text.secondary">Please wait while we verify your email address</Typography>
                <CircularProgress sx={{ my: 2 }} />
                <Typography color="text.secondary">This process may take a few moments.</Typography>
                <Typography color="text.secondary">Please do not close this window.</Typography>
            </Paper>
        </Box>
    );
};

export default VerifyPage;
