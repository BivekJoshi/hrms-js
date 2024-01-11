import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addfamily,
  addfamilyMember,
  deleteFamily,
  editFamily,
  editFamilyMember,
  getFamilyById,
} from "../../api/family/family-api";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employee/employee-api";

export const useGetEmployeeById = () => {
  const { id } = useParams();
  return useQuery(["getEmployeeById", id], () => getEmployeeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddFamily = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(["addFamily"], (formData) => addfamily(formData, id), {
    onSuccess: (data, variables, context) => {
      toast.success(`Successfully added family member`);
      onSuccess && onSuccess(data, variables, context);
      queryClient.refetchQueries("getEmployeeById");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddfamilyMember = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const addEmployeeDetails = useMutation(
    ["addfamilyMember"],
    async (formData) => await addfamilyMember(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success(`Successfully added family member`);
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getFamilyById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    addEmployee: addEmployeeDetails.mutate,
    isSuccess: addEmployeeDetails.isSuccess,
  };
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetFammilyById = (id) => {
  return useQuery(["getFamilyById", id], () => getFamilyById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditFamily = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const mutateEditFamily = useMutation(
    ["editFamily"],
    async (formData) => {
      await editFamilyMember(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("Family edited sucessfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getFamilyById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    editFamilyMutate: mutateEditFamily.mutate,
    isSuccess: mutateEditFamily.isSuccess ? true : false,
  };
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteFamily = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteFamily"],
    async (memberId) => await deleteFamily(memberId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Family member deleted successfully");
        queryClient.refetchQueries("getFamilyById");

        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
