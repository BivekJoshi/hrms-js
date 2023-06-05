import { useQuery } from 'react-query';
import { getEmployee } from '../../api/employee/employee-api';

export const useGetEmployee = () => {
  return useQuery(['getEmployee'], () => getEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
