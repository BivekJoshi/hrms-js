import React from 'react';
import { useFormik } from 'formik';
import { useAddResetPassword, useGetLoggedInUser } from '../usePassword';

const useAddForgotPasswordForm = () => {
    const { data: loggedInUser } = useGetLoggedInUser();
    
    const { mutate } = useAddResetPassword({});

    const formik = useFormik({
        initialValues: {
            id: loggedInUser?.id,
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