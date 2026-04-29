import api from '../api/axios';

const PAYMENT_BASE_URL = "/api/payments";

export const createCheckoutSession = async (referenceId, referenceType) => {
    const response = await api.post(`${PAYMENT_BASE_URL}/create-checkout-session`, {
      referenceId,
      referenceType,
    });
    return response.data.checkoutUrl;
};

export const confirmPayment = async (sessionId) => {
    await api.post(`${PAYMENT_BASE_URL}/confirm`, null, {
      params: { sessionId },
    });
};

export const failPayment = async (referenceId, referenceType, reason) => {
    await api.post(`${PAYMENT_BASE_URL}/fail`, {
      referenceId,
      referenceType,
      reason,
    });
};