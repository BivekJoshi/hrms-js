import { axiosInstance } from "../../../auth/axiosInterceptor";

export const addPermanentAddress = async (formData, id) => {
  const data = await axiosInstance.post(`/address/create/${id}`, formData);
  return data;
};

export const addTemporaryAddress = async (formData, id) => {
  if (id) {
    const response = await axiosInstance.post(`/address/create/${id}`, [
      formData,
    ]);
    return response;
  }
};

export const getAddressById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/address/employee-id/${id}`);
    return data;
  }
};
export const getEmployeeAddressById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/address/employee-id/${id}`);
    return data;
  }
};

export const getDistrict = async (provienceId) => {
  if (provienceId) {
    const res = await axiosInstance.get(
      `/utility/district?province=${provienceId}`
    );
    return res;
  }
};
export const getMunicipality = async (district) => {
  if (district) {
    const res = await axiosInstance.get(
      `/utility/municipal?district=${district}`
    );
    return res;
  }
};

export const editAddress = async (formData, id) => {
  if (id) {
    const data = axiosInstance.post(`/address/create/${id}`, formData);
    return data;
  }

  // let addressId = [];
  // if (formData?.addresses.length > 0) {
  //   addressId.push(formData?.addresses[0]?.id);
  //   addressId.push(formData?.addresses[1]?.id);
  //   if (addressId[1]) {
  //     const data = await axiosInstance.put(
  //       `/address/edit/${id}?aIds=${addressId[0]}&aIds=${addressId[1]}`,
  //       formData.addresses
  //     );
  //     return data;
  //   } else {
  //     const data = await axiosInstance.put(
  //       `/address/edit/${id}?aIds=${addressId[0]}`,
  //       formData.addresses
  //     );
  //     return data;
  //   }
  // } else if (formData?.addresses.length === 1) {
  //   addressId.push(formData?.addresses[0]?.id);
  //   const data = await axiosInstance.put(
  //     `/address/edit/${id}?aIds=${addressId[0]}`,
  //     formData.addresses
  //   );
  //   return data;
};
