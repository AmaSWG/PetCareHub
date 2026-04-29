import api from '../api/axios';
import { getImageUrl } from '../api/imageUtils';

// Re-export getImageUrl for components that expect it here
export { getImageUrl };

export const getAllPets = async () => {
  const response = await api.get('/api/pets');
  return response.data;
};

export const getPetById = async (id) => {
  const response = await api.get(`/api/pets/${id}`);
  return response.data;
};

export const addPet = async (petData) => {
  const response = await api.post('/api/pets', petData);
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await api.put(`/api/pets/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => {
  await api.delete(`/api/pets/${id}`);
};
