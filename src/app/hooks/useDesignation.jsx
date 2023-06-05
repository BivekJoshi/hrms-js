import { useQuery } from 'react-query';
import { getDesignation } from '../api/designation-api';

export const useGetDesignation = () => {
  return useQuery(['getDesignation'], () => getDesignation(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};