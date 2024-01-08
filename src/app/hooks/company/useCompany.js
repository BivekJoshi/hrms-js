import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCompany,
  deleteCompany,
  editAssignCompany,
  editCompany,
  getCompany,
  getCompanyById,
} from "../../api/company/company-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetCompany = () => {
  return useQuery(["getCompany"], () => getCompany(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GETBYID_____________________________________*/
export const useGetCompanyById = (id) => {
  return useQuery(["getCompanyById", id], () => getCompanyById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddCompany = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addCompany"], (formData) => addCompany(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Succesfully added Company");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getCompany");
    },
    onError: (err, _variables, _context) => {
      toast.error(`${err.message}`);
    },
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteCompany = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const companyDelete = useMutation(
    ["deleteCompany"],
    async (branchId) => await deleteCompany(branchId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted Company");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getCompany");
      },
    }
  );
  return {
    isSuccess: companyDelete.isSuccess,
    deleteCompanyMutation: companyDelete.mutate,
  };
};

/*________________________EDIT_____________________________________*/
export const useEditCompany = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editCompany"], (formData) => editCompany(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully edited Company");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getCompany");
    },
  });
};

/*________________________EDIT-assign-branch_____________________________________*/
export const useEditAssignCompany = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editCompany"],
    (formData) => editAssignCompany(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited Company");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getCompany");
      },
    }
  );
};
