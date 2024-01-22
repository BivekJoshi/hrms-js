import { useAddTodoList, useEditTodoList } from "../useTodoList";
import { useFormik } from "formik";
import { TodoListSchema } from "../valaidation/todoListSchema";
import { isEqual } from "lodash";
import { toast } from "react-toastify";

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
    enableReinitialize: true,
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
    if (!isEqual(values, formik.initialValues)) {
      editTodo(values, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
      onClose();
    }
  };

  return { formik };
};

export default useTodoListForm;
