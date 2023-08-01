import { useFormik } from "formik";
import { DepartmentSchema } from "../Validation/DepartmentSchema";
import { useAddDepartment, useEditDepartment } from "../useDepartment";

const useDepartmentForm = (data) => {
  const { mutate: addDepartment } = useAddDepartment({});
  const { mutate: editDepartment } = useEditDepartment({});

  const formik = useFormik({
    initialValues: {
      departmentName: data?.departmentName || "",
      departmentType: data?.departmentType || "",
      departmentDescription: data?.departmentDescription || "",
      id: data?.id || "",
    },
    validationSchema: DepartmentSchema,
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
    addDepartment(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editDepartment(values, formik);
  };

  return { formik };
};

export default useDepartmentForm;
