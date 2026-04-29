import api from "../../../api/axios";

const API_BASE = '/api/staff/receipts';

export const receiptService = {
  getEligibleOrders: async () => {
    const response = await api.get(`${API_BASE}/orders/eligible`);
    return response.data;
  },

  generateInvoice: async (orderId, payload = {}) => {
    const url = `${API_BASE}/orders/${orderId}`;
    console.log('Generating invoice - URL:', url);
    console.log('Generating invoice - Payload:', payload);
    const response = await api.post(url, payload);
    return response.data;
  },

  getAllInvoices: async () => {
    const response = await api.get(API_BASE);
    return response.data;
  },

  getInvoiceById: async (invoiceId) => {
    const response = await api.get(`${API_BASE}/${invoiceId}`);
    return response.data;
  }
};
