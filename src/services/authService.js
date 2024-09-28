import axios from 'axios';
import config from '../config/config';

const url = config.API_URL;
const headers = {
  'Content-Type': 'application/json'
}

const register = (userData) => {
  return axios.post(`${url}/register`, userData, headers);
}

export default {
  register
};