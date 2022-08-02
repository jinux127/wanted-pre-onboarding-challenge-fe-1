import axios from 'axios';
import { ITodoResponse, ITodos, ITodosResponse } from 'types/interfaces';

export const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

customAxios.interceptors.request.use((config) => {
  // config.withCredentials = true;
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
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

export const createTodo = async (postData: ITodos) => {
  try {
    const res = (await customAxios.post('/todos', postData)) as ITodoResponse;
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTodo = async () => {
  try {
    const res = (await customAxios.get('/todos')) as ITodosResponse;
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTodoById = async (id: string) => {
  try {
    const res = (await customAxios.get(`/todos/${id}`)) as ITodoResponse;
    return res;
  } catch (error) {
    console.log(error);
  }
};
