import axios from 'axios';
import clientConfig from '../config/config';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: clientConfig.API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const excludedUrls = ['register', 'login'];
    const token = localStorage.getItem('pet1-token');
    const isToken = token && token !== 'undefined';
    const splitedUrl = config?.url?.split(`${clientConfig.API_URL}/`);
    let isExcluded = false;
    let url = ''; 

    if (splitedUrl?.length) {
      url = splitedUrl[0];
      isExcluded = excludedUrls.includes(url);
    }

    if (!isExcluded && isToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    localStorage.removeItem('pet1-token');
    
    const navigate = useNavigate();
    navigate('/login');
    
    return Promise.reject(error);
  }
);

export default axiosInstance;