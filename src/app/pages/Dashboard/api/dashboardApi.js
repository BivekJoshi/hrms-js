import { useQuery } from "react-query";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

const testData={
    totalUser:1,
    totalEmployee:1,
    events:1,
    holidays:1,
    project:1,
    employeeInfo:{
      all:"1",
      new:1,
      male:1,
      female:1,
    },
    projectInfo:{
      total:'',
      completed:1,
      pendig:1,
      progress:1,
      delayed:'1'
    },
    ResentProject:"1"

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
