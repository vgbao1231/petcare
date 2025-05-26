import { Container } from '@mui/material';
import Header from './Header/Header';

export function HeaderLayout({ children }) {
    return (
        <Container disableGutters maxWidth={false}>
            <Header />
            {children}
        </Container>
    );
}
