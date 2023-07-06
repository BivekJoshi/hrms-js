import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getTodayBirthday,
  getUpcomingBirthday,
  remmoveNotification,
  
  // removeNotification,
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

export const useRemoveNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(["removeNotification"], () => remmoveNotification(), {
    onSuccess: (data, variables, context) => {
      // onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getTodayBirthday");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};
