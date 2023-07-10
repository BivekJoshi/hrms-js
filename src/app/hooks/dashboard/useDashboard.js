import { useQuery } from 'react-query';
import { getDashboard, getProjectStatus } from '../../api/dashboard/dashboard-api';

export const useGetDashboard = () => {
  return useQuery(['getDashboard'], () => getDashboard(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetProjectStatus = () => {
  return useQuery(['getProjectStatus'], () => getProjectStatus(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};