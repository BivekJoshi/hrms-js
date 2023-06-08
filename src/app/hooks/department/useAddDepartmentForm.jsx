import React from 'react';
import { useFormik } from 'formik';
import { useAddDepartment } from './useDepartment';
import { addDepartmentSchema } from './addDepartmentSchema';

const useAddDepartmentForm = () => {
    const { mutate } = useAddDepartment({});

    const formik = useFormik({
        initialValues: {
            departmentName: '',
            departmentType: '',
            departmentDescription: '',
        },
        validationSchema: addDepartmentSchema,
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

export default useAddDepartmentForm;
