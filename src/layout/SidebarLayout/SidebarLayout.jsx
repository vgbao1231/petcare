import { Container } from '@mui/material';
import { routesConfig } from '@src/configs/routesConfig';
import Sidebar from '@src/layout/SidebarLayout/Sidebar/Sidebar';

export function SidebarLayout({ children }) {
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', maxWidth: 1 }}>
            <Sidebar sidebarItems={routesConfig.admin} />
            {children}
        </Container>
    );
}
