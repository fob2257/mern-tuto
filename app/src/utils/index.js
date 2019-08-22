import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const decodeAuthToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      const decodedToken = jwtDecode(token) || {};
      const expirationTime = (decodedToken.hasOwnProperty('exp')) ? new Date(decodedToken.exp * 1000) : new Date();
      const res = (Object.keys(token).length > 0 && expirationTime > new Date()) ? { decodedToken, expirationTime } : {};

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
