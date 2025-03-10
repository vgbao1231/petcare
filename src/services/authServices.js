import { api } from '@src/configs/apiConfig';
import Cookies from 'js-cookie';

const API_USER_PREFIX = import.meta.env.VITE_API_USER_PREFIX;

const register = async (formData) => {
    try {
        const response = await api.post(`${API_USER_PREFIX}/register`, {
            email: formData.email,
            name: formData.firstName + formData.lastName,
            password: formData.password,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const verify = async (token) => {
    try {
        const response = await api.get(`${API_USER_PREFIX}/verify`, {
            params: {
                token,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const login = async (formData) => {
    try {
        // TODO: Giả lập token, có thể thay đổi theo API thực tế
        console.log('data form auth context: ', formData);

        const { accessToken, refreshToken } = {
            accessToken: formData.email.includes('admin') ? 'ADMIN' : 'USER',
            refreshToken: 'REFRESH',
        };

        // Lưu token vào cookie
        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
    } catch (error) {
        console.log(error);
    }
    // try {
    //     console.log(formData);
    //     const response = await api.post(`${API_USER_PREFIX}/login`, formData);
    //     return response.data;
    // } catch (error) {
    //     console.error(error);
    //     throw error;
    // }
};

const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};

export const authServices = {
    register,
    verify,
    login,
    logout,
};
