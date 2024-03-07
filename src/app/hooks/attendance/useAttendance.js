import { useQuery } from "react-query";
import {
  getAttendance,
  getEmployeeAttendanceById,
  getEmployeeAttendanceFilter,
  getEmployeeAttendanceMonthWise,
  getEmployeeAverageWork,
} from "../../api/attendance/attendance-api";

export const useGetAttendance = ({
  employeeId,
  fromDate,
  toDate,
  loggedInId,
}) => {
  return useQuery(
    ["getAttendance"],
    () => getAttendance({ employeeId, fromDate, toDate, loggedInId }),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________GETEMPLOYEEATTENDANCEBYID_____________________________________*/
}
export const useGetEmployeeAttendanceById = (id) => {
  return useQuery(
    ["getEmployeeAttendanceById", id],
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
    ["getEmployeeAttendanceMonthWise", date],
    () => getEmployeeAttendanceMonthWise(date),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};
