import axios        from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('_login_token');
};

const apiAxios = axios.create({
  baseURL: 'https://staging.mistythecloudserver.com',
  headers: {
    "content-type": "application/json"
  },
});

apiAxios.interceptors.request.use(async config => {
  let token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiAxios;
