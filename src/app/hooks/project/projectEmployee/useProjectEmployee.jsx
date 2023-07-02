import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProjectEmployee,
  addProjectEmployee,
  getProjectEmployeeById,
  deleteProjectEmployee,
} from "../../../api/project/projectEmployee-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetProjectEmployee = () => {
  return useQuery(["getProjectEmployee"], () => getProjectEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-BY_ID_____________________________________*/
export const useGetProjectEmployeeById = (id) => {
  return useQuery(["getProjectEmployeeById", id], () => getProjectEmployeeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddProjectEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addProjectEmployee"], (formData) => addProjectEmployee(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Project added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProjectEmployeeById");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditProjectEmployee = async ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editProjectEmployee"], (formData) => editProjectEmployee(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully edited project");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProjectEmployee");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${(err, message)}`);
    },
  });
};

  /*________________________DELETE_____________________________________*/
export const useDeleteProjectEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteProjectEmployee"],
    (id) => deleteProjectEmployee(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployeeById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

