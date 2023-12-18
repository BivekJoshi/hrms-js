import { useQuery } from "react-query";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

const testData=[
    {
        employeeName:"ram Krishna",
        leaveType:"CASUAL",
        fromDate:"2080-10-12",
        toDate:"2080=10-16",
        status:"APPROVED",
        leaveReason:"Bed Rest",
        approvedBy:'Rajan Gimire',
        isHalfDay:false,
        remark:"take your time"
    },
    {
        employeeName:"Hari Bahadur",
        leaveType:"CASUAL",
        fromDate:"2080-10-12",
        toDate:"2080=10-16",
        status:"PENDING",
        leaveReason:"Bed Rest",
        approvedBy:'Rajan Gimire',
        isHalfDay:false,
        remark:"take your time"
    },
]

const fetchDashBoard = () => {
  return axiosInstance.get("/leave/get-all");
};

export const useLeaveDataSearch = (onSuccess, onError) => {
  return useQuery(["leave-information"], () => fetchDashBoard(), {
    onSuccess,
    onError,
    // select: (response) => response.data,
    select: (response) => testData,

  });
};
