import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getToken = async () => {
  let token = await AsyncStorage.getItem('@storage_Key');
  return token;
};
const instance2 = axios.create({
  baseURL: 'http://192.168.4.1/:80',
  headers: {
    //  "content-type": "application/json"
    // Authorization: `Bearer ${getToken()}`,
  },
});


instance2.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@storage_Key');
  console.log('tokennnnnnn', token);
  config.headers.Authorization = `Bearer ${await getToken()}`;
  return config;
});

export default instance2;
