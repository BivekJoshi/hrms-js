import { useQuery } from "react-query";
import { getAllEmployeeData } from "../../../api/employee/employee-api";
import { getEvent, getEventAttenderList } from "../../../api/event/event-api";

const employeeOptions = (data) => {
  if (data) {
    return data.map((item) => ({
      label: item?.middleName
        ? item?.firstName + " " + item?.middleName + " " + item?.lastName
        : item?.firstName + " " + item?.lastName,
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
    employeeAllData: getQuery?.data,
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
    eventAllData: getQuery?.data,
    isLoading: getQuery.isLoading,
  };
};

export const useGetAllEventAttendance = (searchParams) => {
  const { data, isLoading, error } = useQuery(
    ['getEventAttenderList', searchParams],
    async () => {
      const eventData = await getEventAttenderList(searchParams);
      return eventData?.events;
    }
  );

  return { queryData: data, queryLoading: isLoading, queryError: error };
};
