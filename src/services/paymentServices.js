import { api } from '@src/configs/apiConfig';

const updatePaymentStatus = async (formData) => {
    try {
        const response = await api.put(`/payments/bank/update-status`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllPayments = async () => {
    try {
        const response = await api.get(`/payments`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getRevenue = async (month) => {
    try {
        const response = await api.get(`/payments/revenue/${month}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const paymentServices = {
    updatePaymentStatus,
    getAllPayments,
    getRevenue
};
