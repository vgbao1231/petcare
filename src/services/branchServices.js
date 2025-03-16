import { api } from '@src/configs/apiConfig';

const getAllBranches = async () => {
    try {
        const response = await api.get(`branches`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const branchServices = {
    getAllBranches,
};
