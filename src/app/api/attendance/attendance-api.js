import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getAttendance = async () => {
  const data = await axiosInstance.get(`/attendance/allGroupedByEmployeeId`);
  return data;
};

{/*________________________GETEMPLOYEEATTENDANCEBYID_____________________________________*/ }
export const getEmployeeAttendanceById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/attendance/${id}`);
    return data;
  }
};
