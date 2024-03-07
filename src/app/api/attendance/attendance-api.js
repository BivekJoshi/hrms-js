import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getAttendance = async ({ employeeId, fromDate, toDate }) => {
  if (!employeeId) {
    const data = await axiosInstance.get(
      `/attendance/allGroupedByEmployeeId?fromDateBS=${fromDate}&toDateBS=${toDate}`
    );
    return data;
  } else {
    const data = await axiosInstance.get(
      `/attendance/allGroupedByEmployeeId?employeeId=${employeeId}&fromDateBS=${fromDate}&toDateBS=${toDate}`
    );
    return data;
  }
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

/*________________________GET EMPLOYEE ATTENDANCE FILTER BY EMPLOYEE ID AND FROM DATE TO DATE_____________________________________*/
export const getEmployeeAttendanceFilter = async () => {
  const data = await axiosInstance.get(
    `/attendance/employees/in-out-time?employeeId=1&fromDate=2024-03-01&toDate=2024-11-0`
  );
  return data;
};
