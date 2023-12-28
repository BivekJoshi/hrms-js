import { useFormik } from "formik";
import { useAddEmpHistory } from "../employee/useEmployeeHistory";
import { HistorySchema } from "./HistorySchema";

const useAddEmployeeHistoryForm = () => {
  const { mutate } = useAddEmpHistory({});

  const formik = useFormik({
    initialValues: {
      pastPosition: "",
      fromDate: "",
      toDate: "",
      description: "",
      remarks: "",
      employerName: "",
      employerAddress: "",
    },
    validationSchema: HistorySchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        // onclose();
        formik.handleReset();
      },
    });
  };

  return { formik };
};

export default useAddEmployeeHistoryForm;
