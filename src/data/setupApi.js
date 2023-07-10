import axios from 'axios';
import { toast } from 'react-toastify';

export function setupApi() {
  const api = axios.create({
    baseURL: 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/',
    headers: {
      'dev-email-address': 'anthonysareis11@gmail.com',
    },
  });


  api.interceptors.response.use(
    response => response,
    error => {
      const { response } = error;
      const status = response ? response.status : null;
      if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
        toast.error('The server failed to respond, please try reloading the page - Error: '+ status);
      } else {
        toast.warn("The server couldn't respond for now, please try again later");
      }
      return Promise.reject(error);
    }
  );

  const timeoutId = setTimeout(() => {
    toast.warn("The server took too long to respond, please try again later");
  }, 5000);

  api.interceptors.response.use(
    response => {
      clearTimeout(timeoutId);
      return response;
    },
    error => {
      clearTimeout(timeoutId);
      throw error;
    }
  );

  return api;
}

export const api = setupApi();
