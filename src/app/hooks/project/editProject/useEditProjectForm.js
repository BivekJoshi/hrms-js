import React from "react";
import { useEditProject, useGetProjectById } from "../useProject";
import { useFormik } from "formik";
import { ProjectSchema } from "../validation/ProjectSchema";
import { isEqual } from "lodash";
import { toast } from "react-toastify";

const useEditProjectForm = (data, onClose) => {
  const { mutate } = useEditProject({});
  const { data: projectCompanyData } = useGetProjectById(data?.projectid);

  const formik = useFormik({
    initialValues: {
      projectName: data?.projectName || "",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
      taskStatus: data?.taskStatus || "",
      projectLeadName: data?.projectLeadName || "",
      projectLeadId: data?.projectLeadId || "",
      companyId: projectCompanyData?.branches?.[0]?.id || "",
      projectid: data?.projectid,
    },
    validationSchema: ProjectSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
      onClose();
    }
  };

  return { formik };
};

export default useEditProjectForm;
