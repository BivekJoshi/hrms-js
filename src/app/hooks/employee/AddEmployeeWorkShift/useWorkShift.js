import { useParams } from "react-router-dom";
import {
  addWorkShift,
  assignWorkShift,
  getWorkShiftAllActive,
  getWorkShiftById,
  getWorkShiftDefault,
  updateWorkShiftStartDate,
} from "../../../api/workShift/workShift-api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

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

/*________________________GET BY WORKSHIFT By Id_____________________________________*/
export const useGetWorkShiftById = (employeeId) => {
  return useQuery(
    ["getWorkShiftById", employeeId],
    () => getWorkShiftById(employeeId),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST__________________________*/
export const useAddWorkShift = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addWorkShift"], (formData) => addWorkShift(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Work schedule added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getWorkShiftAllActive");
    },
  });
};

/*________________________POST__________________________*/
export const useAssignWorkShift = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["assignWorkShift"],
    (formData) => assignWorkShift(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Work schedule assign successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getWorkShiftAllActive");
      },
    }
  );
};

/*________________________PuT__________________________*/
export const useUpdateWorkShiftStartDate = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["updateWorkShiftStartDate"],
    (formData) => updateWorkShiftStartDate(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully change Start Date");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getWorkShiftById");
      },
    }
  );
};

