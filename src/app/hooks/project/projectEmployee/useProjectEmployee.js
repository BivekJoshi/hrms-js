import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProjectEmployee,
  addProjectEmployee,
  getProjectEmployeeById,
  deleteProjectEmployee,
  editProjectEmployee,
  getProjectEmployeeTaskById,
  addProjectEmployeeCreateTask,
  addProjectEmployeeUpdateTask,
  editProjectEmployeeAddRemoveTaskId,
  getProjectEmployeeTaskByLoggedInUser
} from "../../../api/project/projectEmployee-api";
import { toast } from "react-toastify";

/*________________________GET___________________________________________________________________________________*/
export const useGetProjectEmployee = () => {
  return useQuery(["getProjectEmployee"], () => getProjectEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-BY_ID________________________________________________________________________________*/
export const useGetProjectEmployeeById = (projectTd) => {
  return useQuery(
    ["getProjectEmployeeById", projectTd],
    () => getProjectEmployeeById(projectTd),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET TASK Logged-In User_____________________________________*/ 
export const useGetProjectEmployeeByLoggedInUser  = () => {
  return useQuery(
    ["getProjectEmployeeTaskByLoggedInUser"],
    () => getProjectEmployeeTaskByLoggedInUser(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};
/*________________________GET TASK ID_______________________________________________________________________________*/
export const useGetProjectEmployeeTaskById = (projectId) => {
  return useQuery(
    ["getProjectEmployeeTaskById", projectId],
    () => getProjectEmployeeTaskById(projectId),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST__________________________________________________________________________________________*/
export const useAddProjectEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addProjectEmployee"],
    (formData) => addProjectEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Employee added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployeeById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*________________________POST TASK_____________________________________________________________________________________*/
export const useAddProjectEmployeeCreateTask = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addProjectEmployeeCreateTask"],
    (formData) => addProjectEmployeeCreateTask(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Employee added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployeeById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*________________________POST UPDATE TASK______________________________________________________________________________*/
export const useAddProjectEmployeeUpdateTask = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addProjectEmployeeUpdateTask"],
    (formData) => addProjectEmployeeUpdateTask(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Employee added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployeeById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*________________________EDIT______________________________________________________________________________________________*/
export const useEditProjectEmployee =  ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editProjectEmployee"],
    (formData) => editProjectEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("successfully edited project");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployee");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${(err, message)}`);
      },
    }
  );
};

/*________________________EDIT PROJECT ADD REMOVE TASK ID_____________________________________*/
export const useEditProjectEmployeeAddRemoveTaskId = async ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editProjectEmployeeAddRemoveTaskId"],
    (formData) => editProjectEmployeeAddRemoveTaskId(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("successfully edited project");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployee");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${(err, message)}`);
      },
    }
  );
};

/*________________________DELETE_____________________________________________________________________*/
export const useDeleteProjectEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteProjectEmployee"],
    (id) => deleteProjectEmployee(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProjectEmployeeById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

