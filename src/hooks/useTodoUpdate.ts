import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from 'api';

export const useTodoUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['detailTodo']);
    },
  });
};
