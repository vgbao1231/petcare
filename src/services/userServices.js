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

const changeUserInfo = async (formData) => {
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



export const userServices = {
    getSelfInfo,
    changeUserInfo,
    changePassword,
};
