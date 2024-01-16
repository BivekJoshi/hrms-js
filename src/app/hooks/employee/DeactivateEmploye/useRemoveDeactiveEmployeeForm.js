import React from 'react';
import { useFormik } from 'formik';
import {
  useActiveTerminateEmployee,
  useTerminateEmployee,
} from './useEmployee';
import * as Yup from 'yup';

// Validation schema for terminating employee
const removeDeactiveEmployeeSchema = Yup.object().shape({
  effectiveDate: Yup.date().required('Please provide effective from date'),
  terminationType: Yup.string().required('Please select termination type'),
});
// Validation schema for activating employee
const activeEmployeeSchema = Yup.object().shape({
  effectiveDate: Yup.date().required('Please provide effective from date'),
  terminationType: Yup.string().required('Please select Activation reason '),
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
    enableReinitialize: true,
    validationSchema: activeEmployeeSchema,
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
