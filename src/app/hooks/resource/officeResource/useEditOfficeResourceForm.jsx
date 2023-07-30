import { useFormik } from "formik";
// import { DepartmentSchema } from '../Validation/DepartmentSchema';
import { useEditOfficeResource } from "./useOfficeResource";

const useEditOfficeResourceForm = (data) => {
  const { mutate } = useEditOfficeResource({});

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      uniqueNumber: data?.uniqueNumber || "",
      description: data?.description || "",
      id: data?.id ||"",
    },
    // validationSchema: DepartmentSchema,
    enableReinitialize: 'true',
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: () => formik.handleReset() });
  };

  return { formik };
};

export default useEditOfficeResourceForm;
