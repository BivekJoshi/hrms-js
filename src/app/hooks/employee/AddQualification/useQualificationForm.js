import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import QualificationSchema from './QualificationSchema';
import { useAddQualification } from '../useQualification';

const useQualificationForm = () => {
  const { id } = useParams();
  const { mutate } = useAddQualification({});

  const formik = useFormik({
    initialValues: {
      board: '',
    },
    validationSchema: QualificationSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    console.log(values);
    values = { ...values };
    mutate(values);
  };
  return { formik };
};

export default useQualificationForm;
