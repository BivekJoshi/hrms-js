import { useFormik } from "formik";
import { useEditEmployee } from "./useEmployeeHistory";
import * as Yup from "yup";

const ValidateSchema = Yup.object().shape({
  effectiveDateTo: Yup.string().required("Effective Date to is required"),
});

const useEditEmployeeDetails = (onclose, tableId) => {
  const { mutate } = useEditEmployee({});
  const formik = useFormik({
    initialValues: {
      effectiveDateTo: "",
    },
    validationSchema: ValidateSchema,
    enableReinitialize: true,
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
