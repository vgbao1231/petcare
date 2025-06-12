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

const createService = async (data) => {
    try {
        const response = await api.post(`services`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateService = async (data) => {
    try {
        const response = await api.put(`services`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteService = async (id) => {
    try {
        const response = await api.delete(`services/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const serviceServices = {
    getAllServices,
    createService,
    updateService,
    deleteService,
};
