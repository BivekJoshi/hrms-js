import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GET BY WORKSHIFT Default_____________________________________*/

export const getWorkShiftDefault = async () => {
  const data = await axiosInstance.get(`/work-shift/default`);
  return data;
};
/*________________________GET BY WORKSHIFT All Active_____________________________________*/

export const getWorkShiftAllActive = async () => {
  const data = await axiosInstance.get(`/work-shift/all-active`);
  console.log(data);
  return data;
};
