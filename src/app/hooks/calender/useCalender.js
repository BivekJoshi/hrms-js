import { useQuery } from "react-query";
import { getConvertedDate } from "../../api/Calender/Calender-api";

/*________________________GET_____________________________________*/
export const useGetConvertedDate = (date) => {
  return useQuery(["getConvertedDate", date], () => getConvertedDate(date), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};