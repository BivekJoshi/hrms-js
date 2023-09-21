import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProject,
  getProjectPageWise,
  addProject,
  getProjectById,
  addActiveProject,
  editProject,
  getDeactivatedProject,
  removeActiveProject,
  getProjectByEmployeeIdInvolved,
  getProjectWiseEmployee,
} from "../../api/project/project-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetProject = () => {
  return useQuery(["getProject"], () => getProject(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
export const useGetProjectPageWise = (pageNumber) => {
  return useQuery(["getProjectPageWise"], () => getProjectPageWise(pageNumber), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};


/*________________________GET_____________________________________*/
export const useGetDeactivatedProject = (id) => {
  return useQuery(["getDeactivatedProject",id], () => getDeactivatedProject(id), {
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


/*________________________GET-BY_ID_____________________________________*/
export const useGetProjectByEmployeeIdInvolved = (employeeId) => {
  return useQuery(["getProjectByEmployeeIdInvolved", employeeId], () => getProjectByEmployeeIdInvolved(employeeId), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-PROJECT_WISE_EMPLOYEE____________________________________*/
export const useGetProjectWiseEmployee = (employeeId) => {
  return useQuery(["getProjectWiseEmployee", employeeId], () => getProjectWiseEmployee(employeeId), {
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

/*________________________POST-TO-ACTIVATE-PROJECT_____________________________________*/
export const useAddActivateProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addProject"], (formData) => addActiveProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Project activated successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};


  /*________________________EDIT_____________________________________*/
export const useEditProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editProject"], (formData) => editProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully edited project");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${(err.message)}`);
    },
  });
};


/*________________________DE-ACTIVATE-PROJECT_____________________________________*/
export const useDeleteProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["removeProject"], (formData) => removeActiveProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully removed project");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${(err.message)}`);
    },
  });
};

/*________________________ACTIVATE-PROJECT_____________________________________*/
export const useActiveProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["activeProject"], (formData) => addActiveProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully added project");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getDeactivatedProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${(err.message)}`);
    },
  });
};