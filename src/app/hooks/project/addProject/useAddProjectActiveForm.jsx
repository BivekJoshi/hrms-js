import React from 'react';
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';
import { useAddActivateProject } from '../useProject';

const useAddProjectActiveForm = () => {
    const { mutate } = useAddActivateProject({});

    const formik = useFormik({
        initialValues: {
            projectLeadId: "",
        },
        validationSchema: ProjectSchema,
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

export default useAddProjectActiveForm;