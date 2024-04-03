import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
