import { useFormik } from "formik";
import { useEditEmployee } from "./useEmployeeHistory";

const useEditEmployeeDetails = (onclose, tableId) => {
  const { mutate } = useEditEmployee({});
  const formik = useFormik({
    initialValues: {
      effectiveDateTo: "",
    },
    onSubmit: (value) => {
      const submittedData = {
        effectiveDateTo: value?.effectiveDateTo,
        tableId: tableId,
      };
      mutate(submittedData, {
        onSuccess: () => {
          onclose();
          formik.handleReset();
        },
      });
    },
  });

  return { formik };
};
export default useEditEmployeeDetails;
