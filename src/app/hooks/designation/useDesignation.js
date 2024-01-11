import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addDesignation,
  deleteDesignation,
  editDesignation,
  getDesignation,
  getDesignationById,
} from "../../api/designation/designation-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetDesignation = () => {
  return useQuery(["getDesignation"], () => getDesignation(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GETBYID_____________________________________*/
export const useGetDesignationById = (id) => {
  return useQuery(["getDesignationById", id], () => getDesignationById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddDesignation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addDesignation"],
    (formData) => addDesignation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added Designation");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDesignation");
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeleteDesignation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const designationDelete = useMutation(
    ["deleteDesignation"],
    async (designationId) => await deleteDesignation(designationId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted Designation");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDesignation");
      },
    }
  );
  return {
    isSuccess: designationDelete.isSuccess,
    deleteDesignationMutation: designationDelete.mutate,
  };
};

/*________________________EDIT_____________________________________*/
export const useEditDesignation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editDesignation"],
    (formData) => editDesignation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited designation");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDesignation");
      },
    }
  );
};
