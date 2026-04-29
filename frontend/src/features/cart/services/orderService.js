import api from "../../../api/axios";

export const orderService = {
  getCheckoutContext: async (userId) => (await api.get(`/api/checkout/${userId}/context`)).data,
  createOrderFromCart: async (userId, payload) => (await api.post(`/api/checkout/${userId}/orders`, payload)).data,
  getPendingOrders: async (userId) => (await api.get(`/api/checkout/${userId}/orders/pending`)).data,
  getOrder: async (userId, orderId) => (await api.get(`/api/checkout/${userId}/orders/${orderId}`)).data,
  submitPayment: async (userId, orderId, paymentMethod, receiptFile) => {
    const formData = new FormData();
    formData.append("paymentMethod", paymentMethod);
    if (receiptFile) {
      formData.append("receipt", receiptFile);
    }

    const response = await api.post(`/api/checkout/${userId}/orders/${orderId}/payment`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  },
  cancelOrder: async (userId, orderId) => (await api.delete(`/api/checkout/${userId}/orders/${orderId}`)).data
};
