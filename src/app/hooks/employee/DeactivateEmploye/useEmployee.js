import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { terminateEmployee, addActiveEmployee, getDeactivatedEmployee, removeActiveEmployee } from "../../../api/employee/employee-api";

/*________________________GET-DEACTIVATE-EMPLOYEE_____________________________________*/
export const useGetDeactivatedEmployee = () => {
  return useQuery(['getDeactivateEmployee'], () => getDeactivatedEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};


/*________________________DE-ACTIVATE-EMPLOYEE_____________________________________*/
export const useDeleteEmployee = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["removeEmployee"], (formData) => removeActiveEmployee(formData), {
      onSuccess: (data, variables, context) => {
        toast.success("successfully removed Employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployee");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${(err.message)}`);
      },
    });
  };
  
  /*________________________ACTIVATE-EMPLOYEE_____________________________________*/
  export const useActiveEmployee = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["activeEmployee"], (formData) => addActiveEmployee(formData), {
      onSuccess: (data, variables, context) => {
        toast.success("successfully activated Employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDeactivateEmployee");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${(err.message)}`);
      },
    });
  };

  /*________________________DE-ACTIVATE-EMPLOYEE_____________________________________*/
export const useTerminateEmployee = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["terminateEmployee"], (formData) => terminateEmployee(formData), {
      onSuccess: (data, variables, context) => {
        toast.success("successfully removed Employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmployee");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${(err.message)}`);
      },
    });
  };