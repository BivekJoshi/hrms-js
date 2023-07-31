import { useFormik } from "formik";
import { useAddDesignation, useEditDesignation } from "../useDesignation";
import { DesignationSchema } from "../Validation/DesigationSchema";

const useDesignationForm = (data) => {
  const { mutate: addDesignation } = useAddDesignation({});
  const { mutate: editDesignation } = useEditDesignation({});

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
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addDesignation(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editDesignation(values, formik);
  };

  return { formik };
};

export default useDesignationForm;
