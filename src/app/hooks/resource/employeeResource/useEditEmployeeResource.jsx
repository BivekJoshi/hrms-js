import { useAddEmployeeResource, useEditEmployeeResource } from "./useEmployeeResource";
import { useFormik } from "formik";

const useEditEmployeeResourceForm = (data) => {
    console.log(data,"data hai ma chai timi ??");
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
    // console.log(values);
    values = {
      ...values,
    };
    // console.log(object);
    mutate(values, formik, { onSucess: () => formik.handleReset() });
  };
  return { formik };
};

export default useEditEmployeeResourceForm;
