import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getToken = async () => {
  let token = await AsyncStorage.getItem('@storage_Key');
  return token;
};
const instance = axios.create({
  baseURL: 'https://staging.mistythecloudserver.com',
  headers: {
    //  "content-type": "application/json"
    // Authorization: `Bearer ${getToken()}`,
  },
});
instance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@storage_Key');
  console.log('tokennnnnnn', token);
  config.headers.Authorization = `Bearer ${await getToken()}`;
  console.log('hhhhhh', await getToken());
  return config;
});
 
export default instance;
