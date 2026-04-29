import api from '../api/axios';

const API_BASE = '/api/users/vets';

/**
 * Get all vets.
 */
export const getAllVets = async () => {
    const response = await api.get(API_BASE);
    return response.data;
};

/**
 * Get a specific vet by ID
 */
export const getVetById = async (vetId) => {
    const response = await api.get(`${API_BASE}/${vetId}`);
    return response.data;
};
