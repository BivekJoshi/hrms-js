import {
  useAddEmployeeResource,
  useEditEmployeeResource,
} from "../useEmployeeResource";
import { useFormik } from "formik";
import { EmployeeResourceSchema } from "./EmployeeResourceSchema";

const useEmployeeResourceForm = (data) => {
  const { mutate: addEmployeeResource } = useAddEmployeeResource({});
  const { mutate: editEmployeeResource } = useEditEmployeeResource({});

  const formik = useFormik({
    initialValues: {
      officeResourceId: data?.officeResourceId || "",
      employeeId: data?.employeeId || "",
      receiveDate: data?.receiveDate || "",
      returnDate: data?.returnDate || "",
      id: data?.id || "",
    },
    validationSchema: EmployeeResourceSchema,
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
    addEmployeeResource(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEmployeeResource(values, formik);
  };

  return { formik };
};

export default useEmployeeResourceForm;
