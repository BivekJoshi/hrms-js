import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addTodoList,
  deleteTodoList,
  editTodoList,
  getTodoList,
  getTodoListById,
  getTodoListByUserId,
} from "../../api/todoList/toDo-api";
import { toast } from "react-toastify";

{
  /*________________________GET_____________________________________*/
}
export const useGetTodoList = () => {
  return useQuery(["getTodoList"], () => getTodoList(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET-BY-ID_____________________________________*/
}
export const useGetTodoListById = (id) => {
  return useQuery(["getTodoListById", id], () => getTodoListById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET-BY-USER-ID_____________________________________*/
}
export const useGetTodoListByUserId = (userId) => {
  return useQuery(
    ["getTodoListByUserId", userId],
    () => getTodoListByUserId(userId),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________POST_____________________________________*/
}
export const useAddTodoList = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(["addTodoList"], (formData) => addTodoList(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Message added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getTodoList");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditTodoList = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editTodoList"], (formData) => editTodoList(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Message edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getTodoList");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteTodoList = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(["deleteTodoList"], (id) => deleteTodoList(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Message deleted successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getTodoList");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};
