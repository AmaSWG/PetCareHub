import api from "../../../api/axios";

export const cartService = {
  getCart: async (userId) => (await api.get(`/api/cart/${userId}`)).data,
  addItem: async (userId, productId, quantity = 1) =>
    (await api.post(`/api/cart/${userId}/items`, { productId, quantity })).data,
  updateQuantity: async (userId, productId, quantity) =>
    (await api.put(`/api/cart/${userId}/items/${productId}`, { quantity })).data,
  removeItem: async (userId, productId) =>
    (await api.delete(`/api/cart/${userId}/items/${productId}`)).data
};
