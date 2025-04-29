import { api } from "@src/configs/apiConfig";
import Cookies from "js-cookie";

const register = async (formData) => {
    try {
        const response = await api.post(`auth/register`, {
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
        const response = await api.get(`auth/verify`, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const login = async (formData) => {
    // role: 1: admin, 2: employee, 3: customer
    try {
        const response = await api.post(`auth/login`, formData);
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

const forgotPassword = async (formData) => {
    try {
        const response = await api.post(`auth/forgot-password`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const resetPassword = async (formData) => {
    try {
        const response = await api.post(`auth/reset-password`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const authServices = {
    register,
    verify,
    login,
    logout,
    forgotPassword,
    resetPassword
}