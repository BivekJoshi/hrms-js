import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartment,
  getDepartmentById,
} from "../../api/department/department-api";
import { toast } from "react-toastify";

{
  /*________________________GET_____________________________________*/
}
export const useGetDepartment = () => {
  return useQuery(["getDepartment"], () => getDepartment(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetDepartmentById = (id) => {
  return useQuery(["getDepartmentById", id], () => getDepartmentById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddDepartment = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addDepartment"], (formData) => addDepartment(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Succesfully added Department");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getDepartment");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteDepartment = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteDepartment"],
    (departmentId) => deleteDepartment(departmentId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted Department");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDepartment");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditDepartment = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editDepartment"],
    (formData) => editDepartment(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited Department");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDepartment");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
