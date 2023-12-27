import { useQuery } from "react-query";
import { getEmployeeDeviceMappingById } from "../../api/employeeMapping/employeeMappingApi";

{
  /*________________________GET_____________________________________*/
}
export const useGetEmployeeDeviceMappingById = () => {
  return useQuery(
    ["getEmployeeDeviceMappingById", ],
    () => getEmployeeDeviceMappingById(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};
