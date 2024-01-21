import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addEvent,
  addEventConfirmation,
  deleteEvent,
  editEvent,
  editEventAttendance,
  getEvent,
  getEventAttenderList,
  getEventById,
  getEventByMonth,
  getEventNotification,
} from "../../api/event/event-api";

/*________________________GET_____________________________________*/
export const useGetEvent = () => {
  return useQuery(["getEvent"], () => getEvent(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET_____________________________________*/
export const useGetEventNotification = () => {
  return useQuery(["getEventNofication"], () => getEventNotification(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetEventAttenderList = (filterState) => {
  const getQuery = useQuery(
    ["getEventAttenderList", filterState],
    () => getEventAttenderList(filterState),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    data: getQuery.data,
    isLoading: getQuery.isLoading,
  };
};

/*________________________GETBYID_____________________________________*/
export const useGetEventById = (id) => {
  return useQuery(["getEventById", id], () => getEventById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET BY MONTH_____________________________________*/
export const useGetEventByMonth = (monthAd) => {
  return useQuery(
    ["getEventByMonth", monthAd],
    () => getEventByMonth(monthAd),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST_____________________________________*/
export const useAddEvent = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addEvent"], (formData) => addEvent(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully added an Event");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getEvent");
    },
    onError: (err, _variables, _context) => {
      // toast.error(`error: ${err.message}`);
    },
  });
};

/*________________________POST CONFIRMATION_____________________________________*/
export const useAddEventConfirmaation = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["addEventConfirmation"],
    (formData) => addEventConfirmation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added an Event Confirmation");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEventNofication");
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeleteEvent = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const eventDelete = useMutation(
    ["deleteEvent"],
    async (eventId) => await deleteEvent(eventId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted an Event");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEvent");
      },
    }
  );
  return {
    isSuccess: eventDelete.isSuccess,
    deleteEventMutation: eventDelete.mutate,
  };
};

/*________________________EDIT_____________________________________*/
export const useEditEvent = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editEvent"], (formData) => editEvent(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully edited an Event");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getEvent");
    },
  });
};

/*________________________EDIT- ATTENDANCE_____________________________________*/
export const useEditEventAttendance = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editEventAttendance"],
    (formData) => editEventAttendance(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited an Event");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEventAttenderList");
      },
    }
  );
};
