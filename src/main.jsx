import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from '@mui/material/styles';
import { theme } from './theme';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <>
        {getInitColorSchemeScript()}
        <CssVarsProvider theme={theme} defaultMode="dark" storageKey="theme-mode">
            <CssBaseline />
            <App />
        </CssVarsProvider>
    </>
    // </StrictMode>
);
