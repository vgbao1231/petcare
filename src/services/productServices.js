import { api } from '@src/configs/apiConfig';

const getAllProduct = async () => {
    try {
        const response = await api.get(`products`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllProductWithStock = async () => {
    try {
        const response = await api.get(`products/with_stock`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllAttachableProduct = async () => {
    try {
        const response = await api.get(`products/is_attachable`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// FOOD, ACCESSORY, MEDICINE
const getProductsByType = async (branch_id, type = '') => {
    try {
        const url = type === ''
            ? `/branches/${branch_id}/products/available/all`
            : `/branches/${branch_id}/products/available`;

        const config = type === ''
            ? {}
            : { params: { product_type: type } };

        const response = await api.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const productServices = {
    getAllProduct,
    getAllProductWithStock,
    getAllAttachableProduct,
    getProductsByType,
};
