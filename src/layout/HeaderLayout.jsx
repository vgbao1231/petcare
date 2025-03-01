import { Container } from '@mui/material';
import Header from '@ui/Header/Header';

export function HeaderLayout({ children }) {
    return (
        <Container disableGutters maxWidth={false} sx={{ position: 'relative' }}>
            <Header />
            {children}
        </Container>
    );
}
