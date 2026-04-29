import api from '../api/axios';

const APPOINTMENT_TYPES_API = '/api/appointment-types';
const DEFAULT_TIME_SLOTS_API = '/api/default-time-slots';

// --- Appointment Types ---

export const getAppointmentTypes = async () => {
    const response = await api.get(APPOINTMENT_TYPES_API);
    return response.data;
};

export const addAppointmentType = async (payload) => {
    const response = await api.post(APPOINTMENT_TYPES_API, payload);
    return response.data;
};

export const updateAppointmentType = async (id, payload) => {
    const response = await api.put(`${APPOINTMENT_TYPES_API}/${id}`, payload);
    return response.data;
};

export const deleteAppointmentType = async (id) => {
    const response = await api.delete(`${APPOINTMENT_TYPES_API}/${id}`);
    return response.data;
};

// --- Default Time Slots ---

export const getDefaultTimeSlots = async () => {
    const response = await api.get(DEFAULT_TIME_SLOTS_API);
    return response.data;
};

export const addDefaultTimeSlot = async (payload) => {
    const response = await api.post(DEFAULT_TIME_SLOTS_API, payload);
    return response.data;
};

export const updateDefaultTimeSlot = async (id, payload) => {
    const response = await api.put(`${DEFAULT_TIME_SLOTS_API}/${id}`, payload);
    return response.data;
};

export const deleteDefaultTimeSlot = async (id) => {
    const response = await api.delete(`${DEFAULT_TIME_SLOTS_API}/${id}`);
    return response.data;
};
