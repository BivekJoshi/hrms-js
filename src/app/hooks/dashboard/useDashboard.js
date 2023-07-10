import { useQuery } from 'react-query';
import { getDashboard, getProjectCount } from '../../api/dashboard/dashboard-api';

export const useGetDashboard = () => {
  return useQuery(['getDashboard'], () => getDashboard(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};


/*________________________GET-PROJECT-COUNT_____________________________________*/
export const useGetProjectCount = () => {
  return useQuery(["getProjectCount"], () => getProjectCount(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};