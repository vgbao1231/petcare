import { api } from '@src/configs/apiConfig';

const getAllProducts = async () => {
    try {
        const response = await api.get(`products/is_attachable`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const productServices = {
    getAllProducts,
};
