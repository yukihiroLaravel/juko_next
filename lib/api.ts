import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
