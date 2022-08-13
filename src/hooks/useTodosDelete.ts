import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from 'api';

export const useTodosDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};
