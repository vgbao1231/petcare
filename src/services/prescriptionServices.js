import { api } from '@src/configs/apiConfig';

const getPrescriptionsByExaminationId = async (examination_id) => {
    try {
        const response = await api.get(`/prescriptions/examination/${examination_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const prescriptionServices = {
    getPrescriptionsByExaminationId
};
