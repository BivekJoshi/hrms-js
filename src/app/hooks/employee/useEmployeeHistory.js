import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addEmpHistory,
  addEmployeeHistory,
  addEmploymentHistory,
  deleteEmployeeHistory,
  editEmployeeHistory,
  getEmployeeEmployment,
  getEmployeeHistory,
  getEmployeeHistoryById,
  transferEmploymentHistory,
} from "../../api/employeeHistory/employeeHistory";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

/*________________________GETBYID_____________________________________*/
export const useGetEmployeeHistoryById = (id) => {
  return useQuery(
    ["getEmployeeHistoryById", id],
    () => getEmployeeHistoryById(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GETBY EMPLOYEE HISTORY ID_____________________________________*/
export const useGetEmployeeHistory = (id) => {
  return useQuery(["getEmployeeHistory", id], () => getEmployeeHistory(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetEmployeeEmployment = (id) => {
  return useQuery(
    ["getEmployeeEmployment", id],
    () => getEmployeeEmployment(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST_____________________________________*/
export const useAddEmployeeHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const addEmployeeDetails = useMutation(
    ["addEmployeeHistory"],
    async (formData) => await addEmployeeHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added Employee History");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("useGetEmployeeHistory");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    addEmployee: addEmployeeDetails.mutate,
    isSuccess: addEmployeeDetails.isSuccess,
  };
};

/*________________________DELETE_____________________________________*/
export const useDeleteHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteEmployeeHistory"],
    (employeeHistoryId) => deleteEmployeeHistory(employeeHistoryId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Employee History deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("useGetEmployeeHistory");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

/*________________________EDIT_____________________________________*/
export const useEditEmployeeHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const mutateEditHistory = useMutation(
    ["editEmployeeHistory"],
    async (formData) => {
      await editEmployeeHistory(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("Employee History edited sucessfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("useGetEmployeeHistory");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    editHistoryMutate: mutateEditHistory.mutate,
    isSuccess: mutateEditHistory.isSuccess,
  };
};

/*________________________POST-FOR-VIEW-DETAIL-ADD-PORTION_____________________________________*/
export const useAddEmpHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["addEmployeeHistory"],
    (formData) => addEmpHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added Employee History");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeHistory");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

export const useAddEmploymentHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["addEmploymentHistory"],
    (formData) => addEmploymentHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added Employment Details");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeEmployment");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

export const useTransferEmploymentHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["transferEmploymentHistory"],
    (formData) => transferEmploymentHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully transfered");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeEmployment");
      },
    }
  );
};
