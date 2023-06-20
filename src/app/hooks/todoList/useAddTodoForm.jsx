import { useFormik } from "formik";
import { addMessageSchema } from "../Message/addMessage/addMessageSchema";

const useAddTodoForm = () => {
    const mutate = useAddMessage({});

    const formik = useFormik({
        initialValues: {
            message: "",
        },
        validationSchema: addMessageSchema,
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