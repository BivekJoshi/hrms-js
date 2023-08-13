import { useFormik } from "formik";
import {
  useAddOfficeResource,
  useEditOfficeResource,
} from "../useOfficeResource";
import { OfficeResourceSchema } from "./OfficeResourceSchema";

const useOfficeResourceForm = (data) => {
  const { mutate: addOfficeResource } = useAddOfficeResource({});
  const { mutate: editOfficeResource } = useEditOfficeResource({});

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      uniqueNumber: data?.uniqueNumber || "",
      description: data?.description || "",
      id: data?.id || "",
    },

    validationSchema: OfficeResourceSchema,
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
    addOfficeResource(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editOfficeResource(values, formik);
  };
  return { formik };
};

export default useOfficeResourceForm;
