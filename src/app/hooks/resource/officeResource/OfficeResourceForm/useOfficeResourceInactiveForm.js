import { useFormik } from "formik";
import { useEditInactiveOfficeResource } from "../useOfficeResource";

const useOfficeResourceInactiveForm = (id) => {
  const { mutate } = useEditInactiveOfficeResource({});

  const handleSubmit = (values) => {
    values = { ...values };
    handleEditAndDeactivate(values)
  };

  const handleEditAndDeactivate = (values) => {
    mutate(values, formik);
  };

  const formik = useFormik({
    initialValues: {
      id: id || "",
    //   isActive: data?.isActive || false,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return { formik };
};

export default useOfficeResourceInactiveForm;
