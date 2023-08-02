import React from "react";
import { useEditProject } from "../useProject";
import { useFormik } from "formik";
import { ProjectSchema } from "../validation/ProjectSchema";

const  useEditProjectForm = (data) => {
  const { mutate } = useEditProject({});

  const formik = useFormik({
    initialValues: {
      projectName: data?.projectName || "",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
      taskStatus: data?.taskStatus || "",
      projectLeadId: data?.projectLeaderId || "",
      companyId: data?.associateCompanies[0].id || "",
      id: data?.id,
    },
    validationSchema: ProjectSchema,
    enableReinitialize: "true",

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

export default useEditProjectForm;