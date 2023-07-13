import React from 'react';
import { useFormik } from 'formik';
import { useActiveEmployee, useDeleteEmployee } from './useEmployee';

export const useRemoveDeactiveEmployeeForm = (data) => {
    
    const { mutate } = useDeleteEmployee({});
    const formik = useFormik({
        initialValues: {
            employeeId: data?.id || "",
            setActivation: data?.setActivation || "",
            effectiveDate: data?.effectiveDate || "",
        },
        enableReinitialize: "true",
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
            setActivation: "",
            effectiveDate: "",
        },
        enableReinitialize: "true",
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