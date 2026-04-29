import api from '../api/axios';

export const getOwnerOrders = async (userId) => {
    return await api.get(`/api/orders/owner/${userId}`);
};

export const getAllOrders = async () => {
    return await api.get('/api/orders');
};

export const getPendingOrders = async () => {
    return await api.get('/api/orders/pending');
};

export const getOrderById = async (orderId) => {
    return await api.get(`/api/orders/${orderId}`);
};

export const updateOrderStatus = async (orderId, status) => {
    return await api.put(`/api/orders/${orderId}/status`, { status });
};

export const cancelOrder = async (orderId) => {
    return await api.post(`/api/orders/${orderId}/cancel`, {});
};

export const generateDummyOrders = async () => {
    return await api.post('/api/orders/generate-dummy', {});
};

export const checkPurchase = async (userId, productId) => {
    const res = await api.get(`/api/orders/check-purchase?userId=${userId}&productId=${productId}`);
    return res.data;
};
