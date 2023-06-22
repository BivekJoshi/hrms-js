import { useState } from 'react';
import { useEditDesignation } from '../useDesignation';

const useEditDesignationForm = (data) => {
  const { mutate } = useEditDesignation({});

  const formik = useState({
    initialValues: {
      positionName: data?.positionName || '',
      positionLevel: data?.positionLevel || '',
      salary: data?.salary || '',
      positionDetails: data?.positionDetails || '',
    },
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
};

export default useEditDesignationForm;
