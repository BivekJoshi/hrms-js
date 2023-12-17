import { useQuery } from 'react-query';
import {
  getAttendance,
  getEmployeeAttendanceById,
  getEmployeeAttendanceMonthWise,
  getEmployeeAverageWork,
} from '../../api/attendance/attendance-api';

export const useGetAttendance = () => {
  return useQuery(['getAttendance'], () => getAttendance(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GETEMPLOYEEATTENDANCEBYID_____________________________________*/
}
export const useGetEmployeeAttendanceById = (id) => {
  return useQuery(
    ['getEmployeeAttendanceById', id],
    () => getEmployeeAttendanceById(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};
{
  /*________________________GETEMPLOYEEATTENDANCEMonthWise_____________________________________*/
}
export const useGetEmployeeAttendanceMonthWise = (date) => {
  return useQuery(
    ['getEmployeeAttendanceMonthWise', date],
    () => getEmployeeAttendanceMonthWise(date),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GETEMPLOYEEATTENDANCE average-work_____________________________________*/

export const useGetEmployeeAverageWork = () => {
  return useQuery(['getEmployeeAverageWork'], () => getEmployeeAverageWork(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
