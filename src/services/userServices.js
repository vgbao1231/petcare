import { api } from '@src/configs/apiConfig';

const getSelfInfo = async () => {
    try {
        const response = await api.get(`users/info/me`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const changeUserInfo = async (formData) => {
    try {
        const response = await api.put(`users/change-info`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const userServices = {
    getSelfInfo,
    changeUserInfo,
};
