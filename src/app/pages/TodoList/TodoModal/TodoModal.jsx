import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetTodoListById } from "../../../hooks/todoList/useTodoList";
import TodoListFields from "../../../components/Form/todoList/TodoListFields";

export const AddTodoListModal = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<TodoListFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditTodoListModal = ({ open, handleCloseModal, data, title }) => {
  // const { data } = useGetTodoListById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <TodoListFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
