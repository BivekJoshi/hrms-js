import React from 'react';
import { useEditProject, useGetProjectById } from '../useProject';
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';

const useEditProjectForm = (data, onClose) => {
  const { mutate } = useEditProject({});
const { data: projectCompanyData } = useGetProjectById(data?.projectid);

  const formik = useFormik({
    initialValues: {
      projectName: data?.projectName || '',
      startDate: data?.startDate || '',
      endDate: data?.endDate || '',
      taskStatus: data?.taskStatus || '',
      projectLeadName: data?.projectLeadName || '',
      projectLeadId: data?.projectLeadId || '',
      companyId: projectCompanyData?.branches?.[0]?.id || '',
      projectid: data?.projectid,
    },
    validationSchema: ProjectSchema,
    enableReinitialize: 'true',

    onSubmit: (values) => {
      handleRequest(values);
    },
  });
console.log("formik",formik)
  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return { formik };
};

export default useEditProjectForm;

