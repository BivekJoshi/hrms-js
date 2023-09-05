import React from 'react';
import { useFormik } from 'formik';
import { useAddRole } from '../../../../hooks/auth/roles/useRole';


export const useAddRoleForm = () => {
    const { mutate } = useAddRole({});

    const formik = useFormik({
        initialValues: {
            name: "",
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