import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import { CssBaseline, getInitColorSchemeScript, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <>
        {getInitColorSchemeScript()}
        <ThemeProvider theme={theme} defaultMode="light" storageKey="theme-mode">
            <CssBaseline />
            <Router
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Router>
        </ThemeProvider>
    </>
    // </StrictMode>
);
