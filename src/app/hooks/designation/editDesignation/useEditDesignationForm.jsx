import { useFormik } from "formik";

import { useEditDesigination } from "../useDesignation";
import { DesignationSchema } from "../validation/DesignationSchema";

const useEditDesignationForm = (data) => {
  const { mutate } = useEditDesigination({});

  const formik = useFormik({
    initialValues: {
      positionName: data?.positionName || "",
      positionLevel: data?.positionLevel || "",
      salary: data?.salary || "",
      positionDetails: data?.positionDetails || "",
      id: data?.id,
    },
    validationSchema: DesignationSchema,
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

export default useEditDesignationForm;
