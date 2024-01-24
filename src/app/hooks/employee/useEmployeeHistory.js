import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addEmpHistory,
  addEmployeeHistory,
  addEmploymentHistory,
  deleteEmployeeHistory,
  editEmployeeDetails,
  editEmployeeHistory,
  editWorkExpirence,
  getEmployeeEmployment,
  getEmployeeHistory,
  getEmployeeHistoryById,
  transferEmploymentHistory,
  transferUpgradeEmployee,
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
        toast.success("Work History added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeHistory");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    addEmployee: addEmployeeDetails.mutate,
    isSuccess: addEmployeeDetails.isSuccess || false,
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
        toast.success("Work History deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeHistory");
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
  // const { id } = useParams();
  const mutateEditHistory = useMutation(
    ["editEmployeeHistory"],
    async (formData) => {
      await editEmployeeHistory(formData);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("Work History edited sucessfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeHistory");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    editHistoryMutate: mutateEditHistory.mutate,
    isSuccess: mutateEditHistory.isSuccess ? true : false,
  };
};

export const useEditWorkExpirenceDoc = (id) => {
  return useMutation(["updateWorkExpirence"], async (formData) => {
    await editWorkExpirence(formData, id);
  });
};

/*________________________POST-FOR-VIEW-DETAIL-ADD-PORTION_____________________________________*/
export const useAddEmpHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["addEmployeeHistory"],
    (formData) => addEmployeeHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added work History");
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
    async (formData) => await addEmploymentHistory(formData, id),
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

export const useEditEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["editEmployeeDetails"],
    async (formData) => await editEmployeeDetails(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully Edit Employment Details");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeEmployment");
      },
    }
  );
};

export const useTransferEmploymentHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["transferEmploymentHistory"],
    async (formData) => await transferEmploymentHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully transfered");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeEmployment");
      },
    }
  );
};

export const useTransferUpgradeEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["transferUpgradeEmployee"],
    async (formData) => await transferUpgradeEmployee(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Success");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployeeEmployment");
      },
    }
  );
};
