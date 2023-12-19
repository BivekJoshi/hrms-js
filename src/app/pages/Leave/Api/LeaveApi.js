import { useQuery } from "react-query";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

const fetchLeaveData = () => {
  return axiosInstance.get("/leave/leave-detail");
};

export const useLeaveDataSearch = (onSuccess, onError) => {
  return useQuery(["leave-information"], () => fetchLeaveData(), {
    onSuccess,
    onError,
    select: (response) => {
      console.log(response);
      return response;
    },
  });
};
