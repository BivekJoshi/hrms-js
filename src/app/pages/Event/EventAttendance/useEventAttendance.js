import { useQuery } from "react-query";
import { getAllEmployeeData } from "../../../api/employee/employee-api";
import { getEvent } from "../../../api/event/event-api";

const employeeOptions = (data) => {
  if (data) {
    return data.map((item) => ({
      label: item?.firstName + " " + item?.middleName + " " + item?.lastName,
      id: item?.id,
    }));
  }
};
const eventOptions = (data) => {
  if (data) {
    return data.map((item) => ({
      label: item?.eventName,
      id: item?.id,
    }));
  }
};

export const usegetAllEmployeeData = () => {
  const getQuery = useQuery(
    ["getAllemployeeData"],
    () => getAllEmployeeData(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    employeeData: employeeOptions(getQuery?.data),
    isLoading: getQuery.isLoading,
  };
};
export const useGetAllEvent = () => {
  const getQuery = useQuery(["getAllEvent"], () => getEvent(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  return {
    eventData: eventOptions(getQuery?.data),
    isLoading: getQuery.isLoading,
  };
};
