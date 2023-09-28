import { axiosInstance } from "../../../auth/axiosInterceptor";
import useAuth from "../../../auth/hooks/component/login/useAuth";

/*________________________GET ALL_____________________________________*/
export const getleave = async () => {
  const { isEmployee } = useAuth();
  if (!isEmployee) {
    const data = await axiosInstance.get(`/leave/get-all`);
    return data;
  }
};

/*________________________GET PENDING LEAVE_____________________________________*/
export const getpendingleave = async () => {
  const data = await axiosInstance.get(`/leave/leaves-pending`);
  return data;
};

/*________________________GET LEAVE OF LOGGED IN USER_____________________________________*/
export const getLoggedInUserLeave = async () => {
  const data = await axiosInstance.get(`/leave/logged-in/user`);
  return data;
};

/*________________________GET LEAVE OF LOGGED IN USER LEAVE BALANCE_____________________________________*/
export const getLoggedInUserLeaveBalance = async () => {
  const data = await axiosInstance.get(
    `/leave/logged-in-user/leave-balance-order-by/leave-type`
  );
  return data;
};

/*________________________GETEMPLOYEELEAVEBYID_____________________________________*/
export const getEmployeeLeaveById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave/employee-id/${id}`);
    return data;
  }
};

/*________________________GETLEAVEBYID_____________________________________*/
export const getLeaveById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave/leave-id/${id}`);
    return data;
  }
};

/*________________________POST BY USER_____________________________________*/
export const addleave = async (formData) => {
  console.log({"formData": formData})
  const submitedData = {
    ...formData,
    leaveTypeId: formData.leaveTypeId?.id,
  };
  const data = await axiosInstance.post(
    `/leave/logged-in-user/create`,
    submitedData
  );
  return data;
};

/*________________________POST BY OTHER_____________________________________*/
export const addLeaveByAdmin = async (formData) => {
  const submitedData = {
    ...formData,
    employeeId: formData.employeeId?.id,
    leaveTypeId: formData.leaveTypeId?.id,
  };
  const data = await axiosInstance.post("/leave/create", submitedData);
  return data;
};

/*________________________EDIT BY USER_____________________________________*/
export const editLeave = async (formData) => {
  console.log({ formData: formData });
  const { id } = formData;
  const data = await axiosInstance.put(
    `/leave/logged-in-user/update?leaveId=${id}`,
    formData
  );
  return data;
};

/*________________________EDIT BY OTHER_____________________________________*/
export const editLeaveByAdmin = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/leave/update/${id}`, formData);
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteLeave = async (leaveId) => {
  const response = await axiosInstance.delete(`/leave/${leaveId}`);
  return response.data;
};
