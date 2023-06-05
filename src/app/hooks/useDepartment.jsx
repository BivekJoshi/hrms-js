import { useQuery } from 'react-query';
import { getDepartment } from '../api/department-api';

export const useGetDepartment = () => {
  return useQuery(['getDepartment'], () => getDepartment(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};