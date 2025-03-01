import Cookies from 'js-cookie';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: Cookies.get('accessToken') || null,
        refreshToken: Cookies.get('refreshToken') || null,
    });

    const navigate = useNavigate();

    const login = async (data) => {
        try {
            // TODO: Giả lập token, có thể thay đổi theo API thực tế
            console.log('data form auth context: ', data);

            const { accessToken, refreshToken } = {
                accessToken: data.email.includes('admin') ? 'ADMIN' : 'USER',
                refreshToken: 'REFRESH',
            };

            // Lưu token vào cookie
            Cookies.set('accessToken', accessToken, { expires: 7 });
            Cookies.set('refreshToken', refreshToken, { expires: 7 });

            setAuth({ accessToken, refreshToken });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setAuth({ accessToken: null, refreshToken: null });
        navigate('/login');
    };

    return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};
