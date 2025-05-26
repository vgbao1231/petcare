import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import { getInitColorSchemeScript } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './contexts/CartContext.jsx';
import { BranchProvider } from './contexts/BranchContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <>
        <ToastContainer />
        {getInitColorSchemeScript()}
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <CartProvider>
                        <BranchProvider>
                            <App />
                        </BranchProvider>
                    </CartProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    </>
    // </StrictMode>
);
