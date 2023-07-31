import { useAddEmployeeResource, useEditEmployeeResource } from "./useEmployeeResource";
import { useFormik } from "formik";

const useEditEmployeeResourceForm = (data) => {
  const { mutate } = useEditEmployeeResource({});
  
  const formik = useFormik({
    initialValues: {
      officeResourceId: data?.officeResourceId||"",
      employeeId: data?.employeeId||"",
      receiveDate: data?.receiveDate||"",
      returnDate: data?.returnDate||"",
      id: data?.id ||"",
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

export default useEditEmployeeResourceForm;
