import React from 'react';
import { useEditTodoList } from '../useTodoList';
import { useFormik } from 'formik';
import { TodoListSchema } from '../valaidation/todoListSchema';

const usEeditTodoListForm = (data) => {
    const { mutate } = useEditTodoList({});
    
    const formik = useFormik({
        initialValues: {
            message: data?.message || "",
            id: data?.id,
        },
        validationSchema: TodoListSchema,
        enableReinitialize: "true",
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    };


    return { formik };
};

export default usEeditTodoListForm;