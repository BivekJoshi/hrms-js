import React from 'react';
import { useFormik } from 'formik';
import { useDeleteEmployee } from './useEmployee';

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

// export const useAddActiveEmployee = (data) => {
    
//     const { mutate } = useActiveProject({});
//     const formik = useFormik({
//         initialValues: {
//             employeeId: data || "",
//         },
//         enableReinitialize: "true",
//         onSubmit: (values) => {
//             handleRequest(values);
//         },
//     });

//     const handleRequest = (values) => {
//         values = {
//             ...values,
//         };
//         mutate(values, formik);
//     };

//     return { formik };
// };