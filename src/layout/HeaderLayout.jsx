import { Container } from '@mui/material';
import Header from '@ui/Header/Header';

export function HeaderLayout({ children }) {
    console.log('test');

    return (
        <Container disableGutters maxWidth={false}>
            <Header />
            {children}
        </Container>
    );
}
