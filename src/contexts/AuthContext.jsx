import { userServices } from '@services/userServices';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(Cookies.get('token'));

    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo'],
        enabled: !!token,
        queryFn: userServices.getSelfInfo,
        onError: () => toast.error('Failed to fetch user info'),
        refetchInterval: 1000 * 60 * 5, // Thời gian refetch lại sau mỗi 5 phút
    });

    return <AuthContext.Provider value={{ token, setToken, userInfo }}>{children}</AuthContext.Provider>;
}
