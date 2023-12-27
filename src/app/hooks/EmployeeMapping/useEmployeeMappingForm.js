import React from "react";
import { useAddEmployeeDeviceMappingById } from "./useEmployeeMapping";
import { useFormik } from "formik";
import AddMapSchema from "./MappingSchema";

export const useEmployeeMappingForm = (data, handleCloseModal) => {
  const { mutate: deviceMutate } = useAddEmployeeDeviceMappingById({});
  const formik = useFormik({
    initialValues: {
      employedId: data?.id || "",
      deviceEmpId: parseInt(data?.deviceEmpId) || "",
      deviceBranchId: data?.deviceBranchId || "",
    },
    validationSchema:   AddMapSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    deviceMutate([values], {
      onSuccess: () => {
        handleCloseModal();
        formik.resetForm();
      },
    });
  };
  return { formik };
};
