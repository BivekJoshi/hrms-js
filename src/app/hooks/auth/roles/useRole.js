import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addRole, deleteRole, editRole, getRole } from "../../../api/auth/roles/role-api";

/*________________________GET_____________________________________*/

export const useGetRole = () => {
  return useQuery(["getRole"], () => getRole(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addUserControl"], (formData) => addRole(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("User added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getUserControl");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

/*________________________EDIT_____________________________________*/
export const useEditRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editUserControl"], (formData) => editRole(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully edited user");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getUserControl");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteUserControl"], (id) => deleteRole(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully deleted user");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getUserControl");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};