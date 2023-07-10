import { useFormik } from "formik";
import { useAddTodoList } from "../useTodoList";
import { TodoListSchema } from "../valaidation/todoListSchema";

const useAddTodoForm = () => {
    const { mutate } = useAddTodoList({});

    const formik = useFormik({
        initialValues: {
            message: "",
            dueDate:"",
            priority:"",
            // status:"",
        },
        validationSchema: TodoListSchema,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = {
            ...values,
        };
        mutate(values, formik, { onSuccess: () => formik.handleReset() });
    };

    return { formik };
};

export default useAddTodoForm;