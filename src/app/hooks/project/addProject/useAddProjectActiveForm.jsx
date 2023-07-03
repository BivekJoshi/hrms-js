import React from 'react';
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';
import { useAddActivateProject, useDeleteProject } from '../useProject';

const useRemoveActiveProject = (data) => {
    const { mutate } = useDeleteProject({});
   console.log(data)
    const formik = useFormik({
        initialValues: {
            projectId: data?.id || "",
            isActive: data?.isActive || "",
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
        mutate(values, formik, { onSuccess: () => formik.handleReset() });
    };

    return { formik };
};

export default useRemoveActiveProject;