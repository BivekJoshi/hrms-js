import React from 'react';
import FormModal from '../../../components/Modal/FormModal';
import { useGetTodoListById } from '../../../hooks/todoList/useTodoList';
import TodoListFields from '../../../components/Form/todoList/TodoListFields';

export const AddTodoListModal = ({ open, handleCloseModal }) => {
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<TodoListFields onClose= {handleCloseModal} />}
            />
        </div>
    );
};

export const EditTodoListModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetTodoListById(id);
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<TodoListFields onclose= {handleCloseModal} data={ data } />}
            />
        </div>
    );
};