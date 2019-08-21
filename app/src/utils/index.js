import axios from 'axios';

export const setAuthToken = (token) => axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const removeAuthToken = () => delete axios.defaults.headers.common['Authorization'];
