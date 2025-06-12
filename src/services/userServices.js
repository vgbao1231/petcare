import { api } from '@src/configs/apiConfig';



const getSelfInfo = async () => {
    try {
        const response = await api.get(`users/me`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const changeSelfInfo = async (formData) => {
    try {
        const response = await api.put(`users/me`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const changePassword = async (formData) => {
    try {
        const response = await api.put(`users/me/password`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllUserWithRole = async () => {
    try {
        const response = await api.get(`/users`,);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUserInfo = async (id, formData) => {
    try {
        const response = await api.put(`/users/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createUser = async (formData) => {
    try {
        const response = await api.post(`/users`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllCustomers = async () => {
    try {
        const response = await api.get(`/customers`,);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllEmployees = async () => {
    try {
        const response = await api.get(`/employees`,);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getUserCount = async () => {
    try {
        const response = await api.get(`/users/count`,);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const userServices = {
    getSelfInfo,
    changeSelfInfo,
    changePassword,
    getAllUserWithRole,
    updateUserInfo,
    createUser,
    getAllCustomers,
    getAllEmployees,
    getUserCount
};
