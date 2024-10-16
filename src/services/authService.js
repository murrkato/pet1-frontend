import axios from 'axios';
import config from '../config/config';
import axiosInstance from './../utils/axiosInstance';

const url = config.API_URL;
const headers = {
  'Content-Type': 'application/json'
}

const register = (userData) => {
  return axios.post(`${url}/register`, userData, headers);
}

const login = (userData) => {
  return axios.post(`${url}/login`, userData, headers);
}

const logout = () => {
  return axiosInstance.get(`${url}/logout`, headers);
}

const getUserToken = () => {
  const storedToken = localStorage.getItem('pet1-token');
  let token = null;

  if (storedToken && storedToken !== 'undefined') {
    token = storedToken;
  }

  return token;
}

const removeUserToken = () => {
  localStorage.removeItem('pet1-token');
}

export default {
  register,
  login,
  logout,
  getUserToken,
  removeUserToken
};