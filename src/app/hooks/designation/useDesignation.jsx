import { useMutation, useQuery } from "react-query";
import {
  addDesignation,
  deleteDesignation,
  editDesignation,
  getDesignation,
  getDesignationById,
} from "../../api/designation/designation-api";
import { toast } from "react-toastify";
// ________________________GET_____________________________________;
export const useGetDesignation = () => {
  return useQuery(["getDesignation"], () => getDesignation(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
/*________________________POST_____________________________________*/

export const useAddDesignation = ({ onSuccess }) => {
  return useMutation(
    ["addDesignation"],
    (formData) => addDesignation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Succesfully added Designation");
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetDesignationById = (id) => {
  return useQuery(["getDesignatioById", id], () => getDesignationById(id), {});
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteDesignation = ({ onSuccess }) => {
  return useMutation(["deletePosition "], (posId) => deleteDesignation(posId), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully deleted designation");
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditDesigination = ({ onSuccess }) => {
  return useMutation(
    ["editPosition"],
    (formData) => editDesignation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited Desigination");
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
