import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GETBYID_____________________________________*/
export const getQualificationById = async (id) => {
  if (id) {
    const data = axiosInstance.get(`/qualification/employee-id/${id}`);
    return data;
  }
};

/*________________________POST_____________________________________*/
export const addQualification = async (formData, id) => {
  const newEdu = formData?.education;
  const dataToPost = newEdu.filter(
    (item) => item.id === undefined || item.id === ""
  );
  const data = await axiosInstance.post(
    `/qualification/create/${id}`,
    dataToPost
  );
  return data;
};

/*________________________EDIT_____________________________________*/
export const editQualification = async (formData, id) => {
  const newData = formData?.education;
  const qIds = newData && newData.map((education) => education?.id);
  const queryString = qIds.map((qId) => `qIds=${qId}`).join("&");
  const data = await axiosInstance.put(
    `/qualification/update/${id}?${queryString}`,
    formData?.education
  );
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteQualifiaction = async (qualificationId) => {
  const data = await axiosInstance.delete(
    `/qualification/delete/${qualificationId}`
  );
  return data;
};
