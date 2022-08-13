import { useQuery } from '@tanstack/react-query';
import { getTodoById } from 'api';

export const useDetailTodo = (id: string) => {
  return useQuery(['detailTodo', id], getTodoById);
};
