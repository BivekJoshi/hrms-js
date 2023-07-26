import React from 'react';
import { useFormik } from 'formik';
import { useAddResetPassword } from '../useAddPassword';

const useAddForgotPasswordForm = () => {
    const { mutate } = useAddResetPassword({});

    const formik = useFormik({
        initialValues: {
            id: "",
            password: "",
        },
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

export default useAddForgotPasswordForm;