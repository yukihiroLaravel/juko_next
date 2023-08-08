import { Axios } from './api';

export const fetcher = (url: string) => {
  return Axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
