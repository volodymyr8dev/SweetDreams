import axios        from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('@storage_Key');
};

const apiAxios = axios.create({
  baseURL: 'https://staging.mistythecloudserver.com',
  headers: {
    "content-type": "application/json"
  },
});

apiAxios.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${await getToken()}`;

  return config;
});

export default apiAxios;
