import axios from 'axios';
import configureStore from '../store/index'

const { store } = configureStore()

const axiosInstance = axios.create({
  baseURL: 'https://1dzv67gxje.execute-api.us-east-1.amazonaws.com/Stage',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { user } = store.getState().login;
    if (user.idToken) {
      config.headers.Authorization = user.idToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;