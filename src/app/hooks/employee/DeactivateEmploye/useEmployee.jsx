import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { removeActiveEmployee } from "../../../api/employee/employee-api";

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
  
  // /*________________________ACTIVATE-EMPLOYEE_____________________________________*/
  // export const useActiveEmployee = ({ onSuccess }) => {
  //   const queryClient = useQueryClient();
  //   return useMutation(["activeEmployee"], (formData) => addActiveProject(formData), {
  //     onSuccess: (data, variables, context) => {
  //       toast.success("successfully added Employee");
  //       onSuccess && onSuccess(data, variables, context);
  //       queryClient.invalidateQueries("getDeactivatedEmployee");
  //     },
  //     onError: (err, _variables, _context) => {
  //       toast.error(`Error: ${(err.message)}`);
  //     },
  //   });
  // };