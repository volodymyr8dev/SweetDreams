import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://staging.mistythecloudserver.com',
  // headers: {
  //    "content-type": "application/json"
  // },
});

export default instance;
