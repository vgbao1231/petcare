import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(Cookies.get('token'));
    const [userInfo, setUserInfo] = useState();

    return <AuthContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>{children}</AuthContext.Provider>;
}
