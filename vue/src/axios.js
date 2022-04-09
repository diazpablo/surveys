import axios from 'axios';
import store from './store';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

axiosClient.interceptors.request.use(config => {
  const { token } = store.state.user;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
