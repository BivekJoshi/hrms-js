import { useFormik } from "formik";
import {
  useAddEmployeeHistory,
  useEditEmployeeHistory,
} from "../../../../hooks/employee/useEmployeeHistory";

const useAddHistoryDetails = () => {
  const {
    addEmployee: addEmployeemutate,
    isSuccess: isFormSubmitSuccess,
  } = useAddEmployeeHistory({});
  const { editHistoryMutate, isSuccess: isEditSuccess } = useEditEmployeeHistory(
    {}
  );

  const formik = useFormik({
    initialValues: {
        employerName: "",
        employerAddress: "",
        pastPosition: "",
        fromDate: "",
        toDate: "",
        description: "",
        remarks:"",
    },
    // validationSchema: PositionSchema,
    onSubmit: (values) => {
      if (values?.id) {
        editHistoryMutate(values, {
          onSuccess: () => {
            formik.handleReset();
          },
        });
      } else handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    console.log(values,"Valuesssssssssssss");

    addEmployeemutate(values, {
      onSuccess: () => {
        formik.handleReset();
      },
    });
  };

  return { formik, isFormSubmitSuccess, isEditSuccess };
};

export default useAddHistoryDetails;
