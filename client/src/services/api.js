import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
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

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Parts API calls
export const partsAPI = {
  getParts: (params) => api.get('/parts', { params }),
  getPartById: (id) => api.get(`/parts/${id}`),
  createPart: (formData) => api.post('/parts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updatePart: (id, formData) => api.put(`/parts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deletePart: (id) => api.delete(`/parts/${id}`),
  getMyListings: () => api.get('/parts/my/listings'),
};

// Admin API calls
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getUserDetails: (userId) => api.get(`/admin/users/${userId}`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getAllParts: (params) => api.get('/admin/parts', { params }),
  deletePart: (partId) => api.delete(`/admin/parts/${partId}`),
  togglePartFeatured: (partId) => api.patch(`/admin/parts/${partId}/featured`),
  updatePartVerification: (partId, data) => api.patch(`/admin/parts/${partId}/verification`, data),
};

export default api;