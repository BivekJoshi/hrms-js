import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________POST_____________________________________*/ }
export const addfamily = async (formData, id) => {
  const newFam = formData?.family;
  const dataToPost = newFam.filter(item => item.id === undefined || item.id === "");
  const data = await axiosInstance.post(`/family-member/create/${id}`, dataToPost);
  return data;
};

// export const addfamily = async (formData, id) => {
//   const newFam = formData?.family;
//   const dataToPost = newFam.filter(item => item.id === undefined || item.id === "");
//   console.log({"postdata": dataToPost, "id": id})
//   if (dataToPost.length > 0) {
//     const data = await axiosInstance.post(`/family-member/create/${id}`, dataToPost);
//     return data;
//   } else {
//     // Handle the case where there is no data without an 'id' to post
//     return { message: 'No data without an "id" property to post' };
//   }
// };

{/*________________________GETBYID_____________________________________*/ }
export const getFamilyById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/family-member/employee-id/${id}`);
    return data;
  }
};

{/*________________________EDIT_____________________________________*/ }
export const editFamily = async (formData, id) => {
  const newData = formData?.family;
  const memberIds = newData && newData.map((member) => member?.id);
  const queryString = memberIds.map((memberId) => `memberIds=${memberId}`).join('&');
  const data = await axiosInstance.put(`/family-member/update/${id}?${queryString}`, formData?.family);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteFamily = async (memberId) => {
  const data = await axiosInstance.delete(`/family-member/delete/${memberId}`);
  return data;
};