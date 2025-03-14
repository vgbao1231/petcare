import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [role, setRole] = useState(Cookies.get('accessToken') || '');

    useEffect(() => {
        const handleChange = () => {
            setRole(Cookies.get('accessToken') || '');
        };

        window.addEventListener('storage', handleChange);
        return () => window.removeEventListener('storage', handleChange);
    }, []);

    return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
}
