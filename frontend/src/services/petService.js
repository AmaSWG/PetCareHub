import api from '../api/axios';
import { getImageUrl } from '../api/imageUtils';

// Re-export getImageUrl for components that expect it here
export { getImageUrl };

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getAllPets = async () => {
  const response = await api.get(`${API_BASE_URL}/api/pets/all`);
  return response.data.data; // Return the 'data' field from ApiResponse
};

export const getPetsByOwner = async (ownerId) => {
  const response = await api.get(`${API_BASE_URL}/api/pets?ownerId=${ownerId}`);
  return response.data.data;
};

export const getPetById = async (petId, ownerId) => {
  const response = await api.get(`${API_BASE_URL}/api/pets/${petId}?ownerId=${ownerId}`);
  return response.data.data;
};

export const searchPetsByOwner = async (ownerId, name) => {
  const response = await api.get(`${API_BASE_URL}/api/pets/search?ownerId=${ownerId}&name=${name}`);
  return response.data.data;
};

export const registerPet = async (ownerId, petData, imageFile) => {
  const formData = new FormData();
  formData.append('ownerId', ownerId);
  
  // Append PetRequestDTO fields
  Object.keys(petData).forEach(key => {
    if (petData[key] !== null && petData[key] !== undefined) {
      formData.append(key, petData[key]);
    }
  });

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await api.post(`${API_BASE_URL}/api/pets`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const updatePet = async (petId, ownerId, petData, imageFile) => {
  const formData = new FormData();
  formData.append('ownerId', ownerId);

  Object.keys(petData).forEach(key => {
    if (petData[key] !== null && petData[key] !== undefined) {
      formData.append(key, petData[key]);
    }
  });

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await api.put(`${API_BASE_URL}/api/pets/${petId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

// Alias for components using old names
export const addPet = registerPet;
export const searchPets = searchPetsByOwner;
