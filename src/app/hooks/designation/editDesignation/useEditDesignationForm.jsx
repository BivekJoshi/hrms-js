import { useFormik } from "formik";
import { useEditDesignation } from "../useDesignation";
import { DesignationSchema } from "../Validation/DesigationSchema";

const useEditDesignationForm = (data) => {
  const { mutate } = useEditDesignation({});

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
    values = {
      ...values,
    };
    mutate(values, formik);
  };

  return { formik };
};

export default useEditDesignationForm;
