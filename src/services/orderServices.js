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

const getOrdersById = async (customer_id) => {
    try {
        const response = await api.get(`/orders/customer/${customer_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllOrders = async () => {
    try {
        const response = await api.get(`/orders`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const orderServices = {
    createOrder,
    getOrdersById,
    getAllOrders
};
