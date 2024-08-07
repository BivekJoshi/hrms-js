import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addProjectCreateTask,
  deleteProjectTask,
  editAssignTaskToEmployee,
  editProjectCreateTask,
  getProjectTask,
  getProjectTaskByTaskId,
  getTaskLoggedInUser,
} from '../../../api/project/projectTask-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

/*________________________GETBYID_____________________________________*/
export const useGetProjectTaskByProjectId = () => {
  const { id } = useParams();
  return useQuery(['getProjectTask', id], () => getProjectTask(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET TASK LOGGEDIN USER_____________________________________*/
export const useGetTaskLoggedInUser = () => {
  return useQuery(['getTaskLoggedInuser'], () => getTaskLoggedInUser(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET PROJECT TASK BY TASK ID_____________________________________*/
export const useGetProjectTaskByTaskId = ({ id }) => {
  return useQuery(
    ['getProjectTaskByTaskId', id],
    () => getProjectTaskByTaskId(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________ADD-REMOVE PROJECT EMPLOYEE PROJECT TASK_____________________________________*/
export const useEditProjectTaskAssign = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editAssignTaskToEmployee'],
    (formData) => editAssignTaskToEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully assigned');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getProjectTask');
      },
    }
  );
};

/*________________________POST TASK_____________________________________________________________________________________*/
export const useAddCreateTask = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addProjectCreateTask'],
    (formData) => addProjectCreateTask(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully added Project Task');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getProjectTask');
      },
    }
  );
};

/*________________________UPDATE TASK_____________________________________________________________________________________*/
export const useEditCreateTask = ({ onSuccess, taskId }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editProjectCreateTask'],
    (formData) => editProjectCreateTask(formData, taskId),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited Task');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getProjectTask');
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeleteProjectTask = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['deleteProjectTask'],
    (taskId) => deleteProjectTask(taskId),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully deleted Task');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getProjectTask');
      },
    }
  );
};
