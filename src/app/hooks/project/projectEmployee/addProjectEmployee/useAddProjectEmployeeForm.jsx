import React from 'react';
import { useFormik } from 'formik';
import { ProjectEmployeeSchema } from '../validation/ProjectEmployeeSchema';
import { useAddProjectEmployee, useEditProjectEmployee } from '../useProjectEmployee';

export const useAddProjectEmployeeForm = () => {
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

export const useEditProjectEmployeeForm = (data) => {
    const { mutate } = useEditProjectEmployee({});
    console.log(data)
    const formik = useFormik({
        initialValues: {
            id: data?.id || "",
            assignedOn: data?.assignedOn || "",
            deAssignedOn: data?.deAssignedOn || "",
            employeeId: data?.employeeId || "",
            projectId: data?.projectId || "",
        },
        validationSchema: ProjectEmployeeSchema,
        enableReinitialize: 'true',
        onSubmit: (values) => {
            handleRequest(values);
        },
    });
    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    };
    return { formik };
}