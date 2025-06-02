import { api } from '@src/configs/apiConfig';

const getExaminationsByPetId = async (petId) => {
    try {
        const response = await api.get(`/examinations/pet/${petId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const examinationServices = {
    getExaminationsByPetId
};
