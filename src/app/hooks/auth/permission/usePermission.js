import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addPermission,
  deletePermission,
  editPermission,
  getPermission,
} from "../../../api/auth/permission/permission-api";

/*________________________GET_____________________________________*/
export const useGetPermission = () => {
  return useQuery(["getUserControl"], () => getPermission(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddPermission = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addUserControl"],
    (formData) => addPermission(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("User added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getUserControl");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*____________________________EDIT-PERMISSION____________________________________________*/
export const useEditPermission = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editPermission"],
    (formData) => editPermission(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("successfully edited user");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getUserRole");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeletePermission = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteUserControl"], (id) => deletePermission(id), {
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