import { Box } from '@mui/material';
import landingImg from '@src/assets/login-background/login6.png';

const LandingPage = () => {
    return (
        <Box>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `url(${landingImg}) center/cover no-repeat`,
                }}
            ></Box>
            <Box>Our Services</Box>
        </Box>
    );
};

export default LandingPage;
