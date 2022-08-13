import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ITodoData, ITodoResponse, ITodos } from 'types/interfaces';

export const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

customAxios.interceptors.request.use((config) => {
  // config.withCredentials = true;
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = {
      authorization: `Bearer ${token}`,
    };
  }
  return config;
});

customAxios.defaults.timeout = 5000;

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (window.location.pathname !== '/auth/login') {
      localStorage.removeItem('userId');
      alert('접근 권한이 없습니다. 로그인 화면으로 이동합니다.');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const createTodo = async (postData: ITodos): Promise<ITodoData[]> => {
  const res = await customAxios.post('/todos', postData);
  return res.data;
};

export const updateTodo = async ({ postData, id }: { postData: ITodos; id: string }): Promise<ITodoData> => {
  const res = await customAxios.put(`/todos/${id}`, postData);
  return res.data.data;
};

export const getTodo = async (): Promise<ITodoData[]> => {
  const res = await customAxios.get('/todos');
  return res.data.data;
};

export const getTodoById = async (query: QueryFunctionContext): Promise<ITodoData> => {
  const res = await customAxios.get(`/todos/${query.queryKey[1]}`);
  return res.data.data;
};

export const deleteTodo = async (id: string): Promise<ITodoData[]> => {
  const res = await customAxios.delete(`/todos/${id}`);
  return res.data.data;
};
