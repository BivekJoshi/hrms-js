import React from 'react';
import { useFormik } from 'formik';
import { useAddForgotPassword } from '../usePassword';

const useAddForgotPasswordForm = () => {
    const { mutate } = useAddForgotPassword({});

    const formik = useFormik({
        initialValues: {
            email: "",
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