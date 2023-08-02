import { useAddTodoList, useEditTodoList } from '../useTodoList';
import { useFormik } from 'formik';
import { TodoListSchema } from '../valaidation/todoListSchema';

const useTodoListForm = (data) => {
    const { mutate : addTodo } = useAddTodoList({});
    const { mutate : editTodo} = useEditTodoList({});

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
          addTodo(values, formik);
        };
      
        const handledEditRequest = (values) => {
          values = { ...values };
          editTodo(values, formik);
        };
      


    return { formik };
};

export default useTodoListForm;