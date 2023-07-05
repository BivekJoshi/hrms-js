import React from 'react';
import { useFormik } from 'formik';
import { ProjectEmployeeSchema } from '../validation/ProjectEmployeeSchema';
import { useAddProjectEmployee } from '../useProjectEmployee';

const useAddProjectEmployeeForm = () => {
    const { mutate } = useAddProjectEmployee({});

    const formik = useFormik({
        initialValues: {
            assignedOn: "",
            deAssignedOn: "",
            employeeId: "",
            projectId: "",
        },
        validationSchema: ProjectEmployeeSchema,
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

export default useAddProjectEmployeeForm;