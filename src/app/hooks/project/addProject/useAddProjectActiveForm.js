import React from 'react';
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';
import { useActiveProject, useDeleteProject } from '../useProject';

export const useRemoveActiveProject = (data) => {
    const { mutate } = useDeleteProject({});
   
    const formik = useFormik({
        initialValues: {
            projectId: data?.id || "",
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

export const useAddActiveProject = (data) => {
    const { mutate } = useActiveProject({});
    const formik = useFormik({
        initialValues: {
            projectId: data || "",
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