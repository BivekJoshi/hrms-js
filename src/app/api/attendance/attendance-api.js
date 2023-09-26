import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getAttendance = async () => {
  const data = await axiosInstance.get(`/attendance/allGroupedByEmployeeId`);
  return data;
};

{/*________________________GETEMPLOYEEATTENDANCEBYID_____________________________________*/ }
export const getEmployeeAttendanceById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/attendance/employee-id/${id}`);
    return data;
  }
};
{/*________________________GETEMPLOYEEATTENDANCEMONTHWISE_____________________________________*/ }
export const getEmployeeAttendanceMonthWise = async (id, date) => {
  if (id, date) {
    const data = await axiosInstance.get(`/attendance/count-month-wise/${id}?yearInBS=${date}`);
    return data;
  }
}