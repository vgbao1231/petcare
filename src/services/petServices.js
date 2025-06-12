import { api } from '@src/configs/apiConfig';

const getPetsByOwner = async (id) => {
    try {
        const response = await api.get(`/pets/owner/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createPet = async (formData) => {
    try {
        const response = await api.post(`/pets`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updatePet = async (formData) => {
    try {
        const response = await api.put(`/pets`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deletePet = async (id) => {
    try {
        const response = await api.delete(`/pets/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getPetCount = async () => {
    try {
        const response = await api.get(`/pets/count`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const petServices = {
    getPetsByOwner,
    createPet,
    updatePet,
    deletePet,
    getPetCount
};
