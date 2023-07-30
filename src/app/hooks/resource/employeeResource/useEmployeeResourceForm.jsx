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
    // console.log(values);
    values = {
      ...values,
    };
    // console.log(object);
    mutate(values, formik, { onSucess: () => formik.handleReset() });
  };
  return { formik };
};

export default useEmployeeResourceForm;
