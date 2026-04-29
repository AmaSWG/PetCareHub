import api from '../api/axios';

/**
 * Fetch all vaccinations for a specific pet
 */
export const getVaccinationsByPetId = async (petId) => {
  const response = await api.get(`/api/medical-records/vaccinations/pet/${petId}`);
  return response.data;
};

/**
 * Add a new vaccination record
 */
export const addVaccinationToPet = async (petId, vaccinationData) => {
  const response = await api.post(`/api/medical-records/vaccinations/pet/${petId}`, vaccinationData);
  return response.data;
};

export const getUpcomingVaccinationsByOwner = async (userId, daysAhead = 30) => {
  const response = await api.get(`/api/medical-records/vaccinations/upcoming/user/${userId}?daysFront=${daysAhead}`);
  return response.data;
};

/**
 * Fetch all reminders for the currently authenticated user
 */
export const getReminders = async (userId = null) => {
  const params = userId ? `?userId=${userId}` : '';
  const response = await api.get(`/api/reminders${params}`);
  return response.data;
};

export const updateVaccination = async (id, vaccinationData) => {
  const response = await api.put(`/api/medical-records/vaccinations/${id}`, vaccinationData);
  return response.data;
};

export default {
  getVaccinationsByPetId,
  addVaccinationToPet,
  updateVaccination,
  getReminders,
};
