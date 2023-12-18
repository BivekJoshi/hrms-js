import { useQuery } from "react-query";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

const fetchDashBoard = () => {
  return axiosInstance.get("/leave/leave-detail");
};

export const useLeaveDataSearch = (onSuccess, onError) => {
  return useQuery(["leave-information"], () => fetchDashBoard(), {
    onSuccess,
    onError,
    select: (response) => {
      console.log(response.data,"response");
      return response.data;
    },
  });
};
