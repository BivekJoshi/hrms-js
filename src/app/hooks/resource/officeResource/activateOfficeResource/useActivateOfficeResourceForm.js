import { useFormik } from "formik";
import { useEditActiveInactiveOfficeResource } from "../useOfficeResource";

export const useAddActiveEmployeeForm = (id) => {
    const { mutate } = useEditActiveInactiveOfficeResource({});
    
    const formik = useFormik({
      initialValues: {      
        id: id,
        isActive: true,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        handleRequest(values);
      },
    });
  
    const handleRequest = (values) => {
      values = {
        id: id,
        ...values,
      };
      mutate(values, formik);
    };
    return { formik };
  };