import { axiosInstance } from "../../../auth/axiosInterceptor";

/*___________________________________POST_________________________________________*/
export const addTrainingDetail = async (formData, id) => {
  const data = await axiosInstance.post(`/training/create/${id}`, formData);
  return data;
};

/*________________________GET ALL_____________________________________*/

export const getTrainingDetail = async () => {
  const data = await axiosInstance.get(`/training/get-all`);
  return data;
};

/*________________________GET BY TRAININGID_____________________________________*/

export const getTrainingById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/training/${id}`);
    return data;
  }
};

/*________________________GET BY EMPLOYEEID_____________________________________*/

export const getEmployeeById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/training/by-employee/${id}`);
    return data;
  }
};

/*________________________EDIT_____________________________________*/

export const editTraining = async (formData, empId) => {
  const { id } = formData;
  if (id && empId) {
    const data = await axiosInstance.put(
      `/training/update/${id}?employeeId=${empId}`,
      formData
    );
    return data;
  }
};

/*________________________DELETE_____________________________________*/

export const deleteTraining = async (id) => {
  const response = await axiosInstance.delete(`/training/${id}`);
  return response.data;
};
