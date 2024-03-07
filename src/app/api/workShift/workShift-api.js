import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GET BY WORKSHIFT Default_____________________________________*/

export const getWorkShiftDefault = async () => {
  const data = await axiosInstance.get(`/work-schedule/default`);
  return data;
};

/*________________________GET BY WORKSHIFT All Active_____________________________________*/

export const getWorkShiftAllActive = async () => {
  const data = await axiosInstance.get(`/work-schedule/all-active`);
  return data;
};

/*________________________GET BY WORKSHIFT By Id_____________________________________*/
export const getWorkShiftById = async (employeeId) => {
  const data = await axiosInstance.get(`/work-schedule/employee/${employeeId}`);
  return data;
};

/*________________________POST_____________________________________*/
export const addWorkShift = async (formData) => {
  const data = await axiosInstance.post("/work-schedule", formData);
  return data;
};

/*________________________POST_____________________________________*/
export const assignWorkShift = async (formData) => {
  const data = await axiosInstance.post(
    "/work-schedule/assign-to-employee",
    formData
  );
  return data;
};

/*________________________PUT_____________________________________*/
export const updateWorkShiftStartDate = async (formData) => {
  const { workScheduleEmployeeId, startDate } = formData;
  const data = await axiosInstance.put(
    `/work-schedule/update-start-date/${workScheduleEmployeeId}?startDate=${startDate}`
  );
  return data;
};
