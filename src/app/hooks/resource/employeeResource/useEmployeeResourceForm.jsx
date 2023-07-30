import { useAddEmployeeResource } from "./useEmployeeResource";
import { useFormik } from "formik";

const useEmployeeResourceForm = () => {
  const { mutate } = useAddEmployeeResource({});
  
  const formik = useFormik({
    initialValues: {
      officeResourceId: "",
      employeeId: "",
      receiveDate: "",
      returnDate: "",
    },
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSucess: () => formik.handleReset() });
  };
  return { formik };
};

export default useEmployeeResourceForm;