import React from "react";
import { useAddEmployeeDeviceMappingById } from "./useEmployeeMapping";
import { useFormik } from "formik";

export const useEmployeeMappingForm = (data) => {
  const { mutate: deviceMutate } = useAddEmployeeDeviceMappingById({});
  const formik = useFormik({
    initialValues: {
      employedId: data?.id ||"",
      deviceEmpId: data?.deviceEmpId || "",
      deviceBranchId: data?.deviceBranchId || "",
    },
    // validationSchema:   changeEmailSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    deviceMutate(values,  {
      onSuccess: () => {
        formik.resetForm();
      },
    });
  };
  return { formik };
};
