import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addPermanentAddress = async (formData, id) => {
  console.log(formData.addresses[1]);
  if (formData.addresses[1]?.province === '') {
    const submittedData = formData.addresses[0];
    const finalData = {
      ...submittedData,
      addressType: "PERMANENT"
    }
  
    console.log(submittedData);
    const data = await axiosInstance.post(`/address/${id}`, [finalData]);
    return data;
  } else if (formData.addresses[1]?.province !== '') {
    const submittedData = formData.addresses?.map((d, index) => {
      return {
        ...d,
        addressType: index === 0 ? 'PERMANENT' : 'TEMPORARY',
      };
    });
    console.log(submittedData);
    const data = await axiosInstance.post(`/address/${id}`, submittedData);
    return data;
  }
};

export const addTemporaryAddress = async (formData, id) => {
  const data = await axiosInstance.post(`/address/temporary/${id}`, formData);
  return data;
};

export const getAddressById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/address/employee/${id}`);
    console.log(data?.district);
    return data;
  }
};

export const editAddress = async (formData, id) => {
  let addressId = [];
  if (formData?.addresses.length > 1) {
    addressId.push(formData?.addresses[0]?.id);
    addressId.push(formData?.addresses[1]?.id);
    if (addressId[1]) {
      const data = await axiosInstance.put(
        `/address/edit/${id}?aIds=${addressId[0]}&aIds=${addressId[1]}`,
        formData.addresses
      );
      return data;
    } else {
      const data = await axiosInstance.put(
        `/address/edit/${id}?aIds=${addressId[0]}`,
        formData.addresses
      );
      return data;
    }
  } else if (formData?.addresses.length === 1) {
    addressId.push(formData?.addresses[0]?.id);
    const data = await axiosInstance.put(
      `/address/edit/${id}?aIds=${addressId[0]}`,
      formData.addresses
    );
    return data;
  }
};
