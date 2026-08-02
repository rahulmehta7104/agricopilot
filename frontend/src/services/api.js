import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllCrops = () => api.get('/crops');
export const getCropById = (id) => api.get(`/crops/${id}`);
export const createCrop = (data) => api.post('/crops', data);
export const updateCrop = (id, data) => api.put(`/crops/${id}`, data);
export const deleteCrop = (id) => api.delete(`/crops/${id}`);
export const searchCrops = (query) => api.get(`/crops/search?q=${query}`);
export const getDashboardData = () => api.get('/dashboard');

// Farm APIs
export const deleteFarmCrop = (farmCropId) => api.delete(`/farms/crops/${farmCropId}`);
export const updateFarmCrop = (farmCropId, data) => api.put(`/farms/crops/${farmCropId}`, data);

// AI Chat APIs
export const startChatSession = (data) => api.post('/chat/sessions', data);
export const getUserChatSessions = (userId) => api.get(`/chat/users/${userId}/sessions`);
export const sendChatMessage = (sessionId, data) => api.post(`/chat/sessions/${sessionId}/messages`, data);

export default api;
