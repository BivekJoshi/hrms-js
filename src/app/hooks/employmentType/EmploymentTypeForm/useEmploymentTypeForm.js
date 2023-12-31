import { useFormik } from "formik";
import {
  useAddEmploymentType,
  useEditEmploymentType,
} from "../useEmploymentType";
import { EmploymentTypeSchema } from "./EmploymentTypeSchema";

const useEmploymentTypeForm = (data, onClose) => {
  const { mutate: addEmploymentType } = useAddEmploymentType({});
  const { mutate: editEmploymentType } = useEditEmploymentType({});

  const formik = useFormik({
    initialValues: {
      name: data?.addEmploymentType || "",
      description: data?.description || "",
      id: data?.id,
    },
    validationSchema: EmploymentTypeSchema,
    enableReinitialize: true,
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
    addEmploymentType(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEmploymentType(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};

export default useEmploymentTypeForm;
