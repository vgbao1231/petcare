import { Box } from '@mui/material';
import { authServices } from '@services/authServices';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    useEffect(() => {
        const verify = async () => {
            const res = await authServices.verify(token);
            console.log(res);
        };
        verify();
    }, [token]);

    return <Box>Verify Successfully</Box>;
};

export default VerifyPage;
