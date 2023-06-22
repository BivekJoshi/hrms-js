import React from 'react';
import FormModal from '../../../components/Modal/FormModal';
import AddTodoListFields from '../../../components/Form/todoList/AddTodoListFields';
import EditTodoListFields from '../../../components/Form/todoList/EditTodoListFields';
import { useGetTodoListById, useEditTodoList } from '../../../hooks/todoList/useTodoList';

export const AddTodoListModal = ({ open, handleCloseModal }) => {
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<AddTodoListFields onClose= {handleCloseModal} />}
            />
        </div>
    );
};

export const EditTodoListModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetTodoListById(id);
    // console.log(data)
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditTodoListFields onclose= {handleCloseModal} data={ data } />}
            />
        </div>
    );
};