import { Container } from '@mui/material';
import { routes } from '@src/configs/routesConfig';
import Sidebar from '@ui/Sidebar/Sidebar';

export function SidebarLayout({ children }) {
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', maxWidth: 1 }}>
            <Sidebar sidebarItems={routes} />
            {children}
        </Container>
    );
}
