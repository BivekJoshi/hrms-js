import { useQuery } from "react-query";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

const testData={
    totalUser:1,
    totalEmployee:1,
    events:1,
    holiday:1,
    project:1,
    employeeInfo:{
      all:1,
      new:1,
      mal:2,
      female:2
    },
    projectInfo:{
      total:1,
      completed:1,
      pending:2,
      progress:3,
      delayed:3
    }

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
