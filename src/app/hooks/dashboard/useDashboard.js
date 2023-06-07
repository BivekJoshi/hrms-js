import { useQuery } from 'react-query';
import { getDashboard } from '../../api/dashboard/dashboard-api';

export const useGetDashboard = () => {
  return useQuery(['getDashboard'], () => getDashboard(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
