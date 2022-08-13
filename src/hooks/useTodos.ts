import { useQuery } from '@tanstack/react-query';
import { getTodo } from 'api';

export const useTodos = () => {
  return useQuery(['todos'], getTodo);
};
