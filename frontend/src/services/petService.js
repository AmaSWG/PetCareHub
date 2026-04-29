import api from '../api/axios';
import { getImageUrl } from '../api/imageUtils';

/**
 * Robust helper to build pet image URLs.
 */
export { getImageUrl };

const API_BASE = '/api/pets';

/**
 * Register a new pet (multipart/form-data with image and ownerId)
 */
export const registerPet = async (formData) => {
    const response = await api.post(API_BASE, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
};

/**
 * Get all pets for a specific ownerId
 */
export const getPetsByOwner = async (ownerId) => {
    const response = await api.get(API_BASE, {
        params: { ownerId }
    });
    return response?.data ?? response;
};

/**
 * Get a specific pet by ID (requires ownerId for verification)
 */
export const getPetById = async (petId, ownerId) => {
    const response = await api.get(`${API_BASE}/${petId}`, {
        params: { ownerId }
    });
    return response.data;
};

/**
 * Search pets by name for a specific ownerId
 */
export const searchPetsByOwner = async (ownerId, name) => {
    const response = await api.get(`${API_BASE}/search`, {
        params: { ownerId, name }
    });
    return response?.data ?? response;
};

/**
 * Get all pets in the system (staff/doctor view)
 */
export const getAllPets = async () => {
    const response = await api.get(`${API_BASE}/all`);
    return response?.data ?? response;
};

/**
 * Update an existing pet profile
 */
export const updatePet = async (petId, formData) => {
    const response = await api.put(`${API_BASE}/${petId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
};
