import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from 'api';

export const useTodoCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};
