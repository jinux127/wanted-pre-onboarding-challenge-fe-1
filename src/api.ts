import axios from 'axios';

export const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

customAxios.interceptors.request.use((config) => {
  // config.withCredentials = true;
  return config;
});

customAxios.defaults.timeout = 5000;

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('userId');
      alert('접근 권한이 없습니다. 로그인 화면으로 이동합니다.');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
