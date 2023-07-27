import { useQuery } from 'react-query';
import { getAttendance, getEmployeeAttendanceById } from '../../api/attendance/attendance-api';

export const useGetAttendance = () => {
  return useQuery(['getAttendance'], () => getAttendance(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GETEMPLOYEEATTENDANCEBYID_____________________________________*/ }
export const useGetEmployeeAttendanceById = (id) => {
  return useQuery(['getEmployeeAttendanceById', id], () => getEmployeeAttendanceById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};