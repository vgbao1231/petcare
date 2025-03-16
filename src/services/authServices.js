import { api } from '@src/configs/apiConfig';
import Cookies from 'js-cookie';

const register = async (formData) => {
    try {
        const response = await api.post(`users/register`, {
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
        const response = await api.get(`users/verify`, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const login = async (formData) => {
    // try {
    //     // TODO: Giả lập token, có thể thay đổi theo API thực tế
    //     console.log('data form auth context: ', formData);

    //     // Lưu token vào cookie
    //     Cookies.set('accessToken', formData.email.includes('admin') ? 'ADMIN' : 'USER', { expires: 7 });
    // } catch (error) {
    //     console.log(error);
    // }
    // 1: admin, 2: employee, 3: customer
    try {
        const response = await api.post(`users/login`, formData);
        Cookies.set('token', response.data.token, { expires: 7 });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const logout = async () => {
    Cookies.remove('token');
};

export const authServices = {
    register,
    verify,
    login,
    logout,
};
