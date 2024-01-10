import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addQualification,
  deleteQualifiaction,
  editQualifiacationDocument,
  editQualification,
  getQualificationById,
} from "../../api/qualification/qualification-api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetQualificationById = (id) => {
  return useQuery(
    ["getQualificationById", id],
    () => getQualificationById(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST_____________________________________*/
export const useAddQualification = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const addEmployeeDetails = useMutation(
    ["addQualification"],
    async (formData) => await addQualification(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Qualification added Successfully");
        queryClient.refetchQueries("getQualificationById");
        onSuccess && onSuccess(data, variables, context);
      },
    }
  );
  return {
    addEmployee: addEmployeeDetails.mutate,
    isSuccess: addEmployeeDetails.isSuccess,
  };
};

/*________________________EDIT_____________________________________*/
export const useEditQualification = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const mutateEditQualification = useMutation(
    ["editQualification"],
    async (formData) => {
      await editQualification(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("Qualification updated sucessfully");
        queryClient.refetchQueries("getQualificationById");
        onSuccess && onSuccess(data, variables, context);
      },
    }
  );
  return {
    editQualificationMutate: mutateEditQualification.mutate,
    isSuccess: mutateEditQualification.isSuccess,
  };
};

export const useEditQualificationDocument = (id) => {
  return useMutation(["updateQualificationDocs"], async (formData) => {
    await editQualifiacationDocument(formData, id);
  });
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteQualification = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteQualifiaction"],
    (qualificationId) => deleteQualifiaction(qualificationId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Education Detail deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getQualificationById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
