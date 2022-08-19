import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance2 = axios.create({
  baseURL: 'http://192.168.4.1:80',
  headers: {
    "content-type": "application/json"
  },
});

export default instance2;
