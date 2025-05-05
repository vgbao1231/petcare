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

const myAppointment = async (id) => {
    try {
        const response = await api.get(`/appointments/customer/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAppointmentDetail = async (id) => {
    try {
        const response = await api.get(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const cancelAppointment = async (id) => {
    try {
        const response = await api.put(`/appointments/update-status`, {
            "appointment_id": `${id}`,
            "status": "CANCELLED"
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const appointmentServices = {
    createAppointment,
    myAppointment,
    getAppointmentDetail,
    cancelAppointment
};
