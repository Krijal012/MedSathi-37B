import api from './api';

export const getAllStaff = async () => {
    const response = await api.get('/staff');
    return response.data;
};

export const updateStaff = async (id, data) => {
    const response = await api.put(`/staff/${id}`, data);
    return response.data;
};

export const deleteStaff = async (id) => {
    const response = await api.delete(`/staff/${id}`);
    return response.data;
};
