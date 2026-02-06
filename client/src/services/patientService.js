import api from './api';

export const getAllPatients = async () => {
    const response = await api.get('/patients');
    return response.data;
};

export const searchPatients = async (query) => {
    const response = await api.get(`/patients/search?query=${query}`);
    return response.data;
};

export const updatePatient = async (id, data) => {
    const response = await api.put(`/patients/${id}`, data);
    return response.data;
};

export const deletePatient = async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
};
