import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getQualificationById = async (id) => {
  const data = axiosInstance.get(`/qualification/employee/${id}`);
  return data;
};

export const addQualification = async (formData, id) => {
  const data = await axiosInstance.post(
    `/qualification/create/${id}`,
    formData?.education
  );
  return data;
};
