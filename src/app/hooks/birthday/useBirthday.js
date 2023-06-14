import { useQuery } from "react-query";
import {
  getTodayBirthday,
  getUpcomingBirthday,
} from "../../api/birthday/birthday-api";

export const useGetTodayBirthday = () => {
  return useQuery(["getTodayBirthday"], () => getTodayBirthday(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetUpcomingBirthday = () => {
  return useQuery(["getUpcomingBirthday"], () => getUpcomingBirthday(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
