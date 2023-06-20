import { useMutation, useQuery } from 'react-query';
import { getTodoList } from '../../api/todoList/toDo-api';

{/*________________________GET_____________________________________*/ }
export const useGetTodoList = () => {
    return useQuery(["getTodoList"], () => getTodoList(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
};