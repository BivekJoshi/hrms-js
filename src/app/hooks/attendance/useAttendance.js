import { useQuery } from 'react-query';
import { getAttendance } from '../../api/attendance/attendace-api';

export const useGetAttendance = () => {
  return useQuery(['getAttendance'], () => getAttendance(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
