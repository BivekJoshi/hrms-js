import { useQuery } from "react-query";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

const testData={
    totalUser:1,
    totalEmployee:1,

}

const fetchDashBoard = () => {
  return axiosInstance.get("project/get-all");
};

export const useDashBoardSearch = (onSuccess, onError) => {
  return useQuery(["dash-information"], () => fetchDashBoard(), {
    onSuccess,
    onError,
    // select: (response) => response.data,
    select: (response) => testData,

  });
};
