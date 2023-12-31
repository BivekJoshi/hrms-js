import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addEmploymentType,
  deleteEmploymentType,
  editEmploymentType,
  getEmploymentType,
  getEmploymentTypeById,
} from "../../api/employmentType/employmentType-api";

/*________________________GET_____________________________________*/
export const useGetEmploymentType = () => {
  return useQuery(["getEmploymentType"], () => getEmploymentType(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GETBYID_____________________________________*/
export const useGetEmploymentTypeById = (id) => {
  return useQuery(
    ["getEmploymentTypeById", id],
    () => getEmploymentTypeById(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST_____________________________________*/
export const useAddEmploymentType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addEmploymentType"],
    (formData) => addEmploymentType(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Succesfully added Employment Type");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmploymentType");
      },
      onError: (err, _variables, _context) => {
        toast.error(`${err.message}`);
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeleteEmploymentType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteEmploymentType"],
    (id) => deleteEmploymentType(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted Employeement Type");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmploymentType");
      },
      // onError: (err, _variables, _context) => {
      //   toast.error(`Error: ${err.message}`);
      // },
    }
  );
};

/*________________________EDIT_____________________________________*/
export const useEditEmploymentType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editCompany"],
    (formData) => editEmploymentType(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited EmploymentType");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getEmploymentType");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
