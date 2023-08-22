import React from 'react';
import { useFormik } from 'formik';
import { useAddPermissionRole, useAddUserControl } from '../../../../hooks/auth/userControl/useUserControl';
import { UserSchema } from './userSchema/UserSchema';


export const useAddUserControlForm = () => {
    const { mutate } = useAddUserControl({});

    const formik = useFormik({
        initialValues: {
            employeeId: "",
            roleId: "",
        },
        validationSchema: UserSchema,
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

export const useAddUserPermissionForm = () => {
    const { mutate } = useAddPermissionRole({});

    const formik = useFormik({
        initialValues: {
            userId: "",
            roleId: "",
            addRole: "",
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