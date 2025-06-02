import { api } from '@src/configs/apiConfig';

const getVaccinationsByPetId = async (petId) => {
    try {
        const response = await api.get(`/vaccinations/pet/${petId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const vaccinationServices = {
    getVaccinationsByPetId
};
