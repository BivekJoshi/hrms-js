import { axiosInstance } from "../../../../auth/axiosInterceptor";

{
  /*________________________GET ALL OFFICE RESOURCE_____________________________________*/
}
export const getofficeResource = async () => {
  const data = await axiosInstance.get(`/office-resource/get-all`);
  return data;
};
  /*________________________GET used OFFICE RESOURCE_____________________________________*/

export const getUsedOfficeResource = async () => {
  const data = await axiosInstance.get(`/office-resource/in-use-by-employee`);
  return data;
};
  /*________________________GET not used OFFICE RESOURCE_____________________________________*/

export const getAvailableOfficeResource = async () => {
  const data = await axiosInstance.get(`/office-resource/available`);
  return data;
};

{
  /*________________________GET OFFICE RESOURCE BY OFFICE RESOURCE ID_____________________________________*/
}
export const getofficeResourceById = async (id) => {
  const data = await axiosInstance.get(`/office-resource/resource-id/${id}`);
  return data;
};

{
  /*________________________GET ALL DEACTIVATED OFFICE RESOURCE_____________________________________*/
}
export const getdeactivaedofficeResource = async () => {
  const data = await axiosInstance.get(`/office-resource/get-deactivated`);
  return data;
};

{
  /*________________________POST OFFICE RESOURCE_____________________________________*/
}
export const addofficeResource = async (formData) => {
  const data = await axiosInstance.post(`/office-resource/create`, formData);
  return data;
};

{
  /*________________________EDIT OFFICE RESOURCE_____________________________________*/
}
export const editofficeResource = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(
    `/office-resource/update/${id}`,
    formData
  );
  return data;
};

{
  /*________________________EDIT OFFICE RESOURCE ACTIVE-INACTIVE_____________________________________*/}
export const editofficeResourceActiveInactive = async (formData) => {
  const { id, isActive } = formData;
  const data = await axiosInstance.put(
    `/office-resource/set-activation/${id}?isActive=${isActive}`,
    formData
  );
  return data;
};
