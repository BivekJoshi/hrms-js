import { useAddTodoList, useEditTodoList } from "../useTodoList";
import { useFormik } from "formik";
import { TodoListSchema } from "../valaidation/todoListSchema";

const useTodoListForm = (data, onClose) => {
  const { mutate: addTodo } = useAddTodoList({});
  const { mutate: editTodo } = useEditTodoList({});

  const formik = useFormik({
    initialValues: {
      message: data?.message || "",
      id: data?.id,
      dueDate: data?.dueDate || "",
      priority: data?.priority || "",
    },
    validationSchema: TodoListSchema,
    enableReinitialize: "true",
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addTodo(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editTodo(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return { formik };
};

export default useTodoListForm;
