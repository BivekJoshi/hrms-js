import React from 'react';
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';
import { useActiveProject, useDeleteProject } from '../useProject';

export const useRemoveActiveEmployee = (data) => {
    const { mutate } = useDeleteEmployee({});
   
    const formik = useFormik({
        initialValues: {
            employeeId: data?.id || "",
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

export const useAddActiveEmployee = (data) => {
    
    const { mutate } = useActiveProject({});
    const formik = useFormik({
        initialValues: {
            employeeId: data || "",
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