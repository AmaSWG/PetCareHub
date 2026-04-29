import api from '../api/axios';

const BASE_URL = '/api/feedbacks';

export const submitFeedback = async (feedbackData) => {
    const response = await api.post(BASE_URL, feedbackData);
    return response.data;
};

export const getAllFeedbacks = async () => {
    const response = await api.get(BASE_URL);
    return response.data;
};

export const getFeedbackByAppointment = async (appointmentId) => {
    const response = await api.get(`${BASE_URL}/appointment/${appointmentId}`);
    return response.data;
};

export const getFeedbackById = async (id) => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const addStaffReply = async (id, reply) => {
    const response = await api.post(`${BASE_URL}/${id}/reply`, reply);
    return response.data;
};

export const getPublicFeedbacks = async () => {
    const response = await api.get(`${BASE_URL}/public`);
    return response.data;
};

export const getFeedbacksByProduct = async (productId) => {
    const response = await api.get(`${BASE_URL}/product/${productId}`);
    return response.data;
};
