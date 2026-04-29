import api from '../api/axios';

const API_BASE = '/api/doctor-slots';

/**
 * Fetch all available time slots for a specific vet.
 */
export const getSlotsByVet = async (vetId) => {
    const response = await api.get(`${API_BASE}/vet/${vetId}`);
    return response.data;
};

/**
 * Fetch the calling vet's own time slots.
 */
export const getMySlots = async () => {
    const response = await api.get(`${API_BASE}/mine`);
    return response.data;
};

/**
 * Add a new time slot for the calling vet.
 */
export const addSlot = async (payload) => {
    const response = await api.post(API_BASE, payload);
    return response.data;
};

/**
 * Update an existing time slot by its ID.
 */
export const updateSlot = async (id, payload) => {
    const response = await api.put(`${API_BASE}/${id}`, payload);
    return response.data;
};

/**
 * Delete a time slot by ID.
 */
export const deleteSlot = async (id) => {
    const response = await api.delete(`${API_BASE}/${id}`);
    return response.data;
};
