import { useParams } from "react-router-dom";
import { getWorkShiftAllActive, getWorkShiftDefault } from "../../../api/workShift/workShift-api";
import { useQuery } from "react-query";


export const useGetWorkShiftDefault = () => {
    return useQuery(["getWorkShiftDefault"], () => getWorkShiftDefault(), {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

  /*________________________GET BY WORKSHIFT All Active_____________________________________*/
export const useGetWorkShiftAllActive = () => {
    return useQuery(["getWorkShiftAllActive"], () => getWorkShiftAllActive(), {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };
  