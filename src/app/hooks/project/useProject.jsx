import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProject,
  addProject,
  getProjectById,
} from "../../api/project/project-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetProject = () => {
  return useQuery(["getProject"], () => getProject(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-BY_ID_____________________________________*/
export const useGetProjectById = (id) => {
  return useQuery(["getProjectById", id], () => getProjectById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addProject"], (formData) => addProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Project added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const editProject = async ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editProject"], (formData) => editProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully edited project");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${(err, message)}`);
    },
  });
};
