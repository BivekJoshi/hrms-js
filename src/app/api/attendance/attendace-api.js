import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getAttendance = async () => {
  const data = await axiosInstance.get(`/attendance/allGroupedByEmployeeId`);
  return data;
};
