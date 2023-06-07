import { useQuery } from 'react-query';
import { getCompany } from '../api/company-api';

export const useGetCompany = () => {
  return useQuery(['getCompany'], () => getCompany(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};