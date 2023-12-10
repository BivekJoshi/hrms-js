import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getAttendance = async () => {
  const data = await axiosInstance.get(`/attendance/allGroupedByEmployeeId`);
  return data;
};

{
  /*________________________GETEMPLOYEEATTENDANCEBYID_____________________________________*/
}
export const getEmployeeAttendanceById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/attendance/employee-id/${id}`);
    return data;
  }
};
{
  /*________________________GETEMPLOYEEATTENDANCEMONTHWISE_____________________________________*/
}
export const getEmployeeAttendanceMonthWise = async (date) => {
  if (date) {
    const data = await axiosInstance.get(
      `/attendance/logged-in-user/monthly-count?yearInBS=${date}`
    );
    return data;
  }
};

/*________________________GETEMPLOYEEATTENDANCE average-work_____________________________________*/

export const getEmployeeAverageWork = async () => {
  const data = await axiosInstance.get(
    `/attendance/logged-in-user/average-work/hour`
  );
  return data;
};
