import api from '../api/axios';

/**
 * Fetch all medical treatments for a specific pet
 */
export const getTreatmentsByPetId = async (petId) => {
  const response = await api.get(`/api/medical-records/treatments/pet/${petId}`);
  return response.data;
};

/**
 * Create a new medical treatment record
 */
export const createTreatment = async (petId, treatmentData) => {
  const response = await api.post(`/api/medical-records/treatments/pet/${petId}`, treatmentData);
  return response.data;
};

/**
 * Get treatment by ID
 */
export const getTreatmentById = async (treatmentId) => {
  const response = await api.get(`/api/medical-records/treatments/${treatmentId}`);
  return response.data;
};

/**
 * Add a new treatment to a pet (alias for createTreatment)
 */
export const addTreatmentToPet = async (petId, treatmentData) => {
  const response = await api.post(`/api/medical-records/treatments/pet/${petId}`, treatmentData);
  return response.data;
};

/**
 * Delete a medical treatment record
 */
export const deleteTreatment = async (treatmentId) => {
  await api.delete(`/api/medical-records/treatments/${treatmentId}`);
};

export default {
  getTreatmentsByPetId,
  createTreatment,
  addTreatmentToPet,
  getTreatmentById,
  deleteTreatment,
};
