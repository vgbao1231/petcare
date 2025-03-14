import { api } from '@src/configs/apiConfig';

const getAllServices = async () => {
    try {
        const response = await api.get(`services`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const serviceServices = {
    getAllServices,
};
