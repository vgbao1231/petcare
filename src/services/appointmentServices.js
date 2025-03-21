import { api } from '@src/configs/apiConfig';

const createAppointment = async (formData) => {
    try {
        const response = await api.post(`/appointments`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const appointmentServices = {
    createAppointment,
};
