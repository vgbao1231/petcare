import { Box, Container } from '@mui/material';
import { routesConfig } from '@src/configs/routesConfig';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

export function HeaderSidebarLayout({ children }) {
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', maxWidth: 1, height: '100vh' }}>
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar sidebarItems={routesConfig.admin} />
                <Box sx={{ flex: 1 }}>
                    <Header />
                    {children}
                </Box>
            </Box>
        </Container>
    );
}
