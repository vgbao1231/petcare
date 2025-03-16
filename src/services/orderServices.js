import { api } from '@src/configs/apiConfig';

const createOrder = async (formData) => {
    try {
        const response = await api.post(`orders`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const orderServices = {
    createOrder,
};
