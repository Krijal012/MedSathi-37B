import api from './api';

export const getAdminStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data;
};

export const getRecentActivities = async () => {
    const response = await api.get('/admin/activities');
    return response.data;
};
