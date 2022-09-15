import axios from 'axios';

const deviceAxios = axios.create({
  baseURL: 'http://192.168.4.1:80',
  headers: {
    "content-type": "application/json"
  },
});

export default deviceAxios;
