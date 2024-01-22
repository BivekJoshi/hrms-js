import { useFormik } from "formik";
import {
  useAddEmploymentType,
  useEditEmploymentType,
} from "../useEmploymentType";
import { EmploymentTypeSchema } from "./EmploymentTypeSchema";
import { isEqual } from "lodash";
import { toast } from "react-toastify";

const useEmploymentTypeForm = (data, onClose) => {
  const { mutate: addEmploymentType } = useAddEmploymentType({});
  const { mutate: editEmploymentType } = useEditEmploymentType({});

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
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
    if (!isEqual(values, formik.initialValues)) {
      editEmploymentType(values, {
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

export default useEmploymentTypeForm;
