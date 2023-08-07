import React from 'react';
import { useFormik } from 'formik';
import { useActiveEmployee, useDeleteEmployee } from './useEmployee';
import * as Yup from 'yup';

// Validation schema for removing a deactivated employee
const removeDeactiveEmployeeSchema = Yup.object().shape({
  effectiveDate: Yup.date().required('Effective date is required'),
});


export const useRemoveDeactiveEmployeeForm = (data) => {
    
    const { mutate } = useDeleteEmployee({});
    const formik = useFormik({
        initialValues: {
            employeeId: data?.id || "",
            setActivation: false,
            effectiveDate: data?.effectiveDate || "",
        },
        enableReinitialize: "true",
        validationSchema: removeDeactiveEmployeeSchema,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = {
            ...values,
        };
        mutate(values, formik);
    };
    return { formik };
};

export const useAddActiveEmployeeForm = (id) => {
    const { mutate } = useActiveEmployee({});
    const formik = useFormik({
        initialValues: {
            employeeId: id || "",
            setActivation: true,
            effectiveDate: "",
        },
        enableReinitialize: "true",
        validationSchema: removeDeactiveEmployeeSchema,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = {
            ...values,
        };
        mutate(values, formik);
    };
    return { formik };
};