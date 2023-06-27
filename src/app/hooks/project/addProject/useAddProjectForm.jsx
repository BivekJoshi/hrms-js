import React from 'react';
import { useFormik } from 'formik';
import { ProjectSChema } from '../validation/ProjectSchema';
import { useAddProject } from '../useProject';

const useAddProjectForm = () => {
    const { mutate } = useAddProject({});

    const formik = useFormik({
        initialValues: {
            projectName: "",
            startDate: "",
            endDate: "",
            projectStatus: "",
            projectLeadId: "",
            companyId: "",
        },
        validationSchema: ProjectSChema,
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

export default useAddProjectForm;