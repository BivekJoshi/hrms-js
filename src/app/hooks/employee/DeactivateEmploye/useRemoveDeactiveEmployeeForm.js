import React from 'react';
import { useFormik } from 'formik';
import {
  useActiveTerminateEmployee,
  useTerminateEmployee,
} from './useEmployee';
import * as Yup from 'yup';

// Validation schema for removing a deactivated employee
const removeDeactiveEmployeeSchema = Yup.object().shape({
  effectiveDate: Yup.date().required('Effective date is required'),
  terminationType: Yup.string().required('Reason is required'),
});

export const useRemoveDeactiveEmployeeForm = (data, onClose) => {
  const { mutate } = useTerminateEmployee({});

  const formik = useFormik({
    initialValues: {
      employeeId: data?.id || '',
      terminationType: data?.terminationType || '',
      effectiveDate: data?.effectiveDate || '',
    },
    enableReinitialize: true,
    validationSchema: removeDeactiveEmployeeSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};

export const useAddActiveEmployeeForm = (id, onClose) => {
  const { mutate } = useActiveTerminateEmployee({});
  const formik = useFormik({
    initialValues: {
      terminationType: '',
      effectiveDate: '',
    },
    enableReinitialize: 'true',
    validationSchema: removeDeactiveEmployeeSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      employeeId: id,
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};
