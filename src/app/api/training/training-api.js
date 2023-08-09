import { axiosInstance } from '../../../auth/axiosInterceptor';

/*___________________________________POST_________________________________________*/
export const addTrainingDetail = async (formData,id) => {
    const data = await axiosInstance.post(`/training/${id}`, formData);
    return data;
};

/*________________________GET ALL_____________________________________*/ 
export const getTrainingDetail = async () => {
  const data = await axiosInstance.get(`/training`);
  return data;
};

/*________________________GET BY TRAININGID_____________________________________*/ 
export const getTrainingById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/training/${id}`);
    return data;
  }
};

/*________________________EDIT_____________________________________*/ 
export const editTraining = async (formData) => {
  const {id} = formData;
  const data = await axiosInstance.put(`/training/${id}`, formData);
  return data;
};

/*________________________DELETE_____________________________________*/ 
export const deleteTraining = async (id) => {
  const response = await axiosInstance.delete(`/training/${id}`);
  return response.data;
};

