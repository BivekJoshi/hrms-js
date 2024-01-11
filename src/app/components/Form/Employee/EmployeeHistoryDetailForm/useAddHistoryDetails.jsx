import { useFormik } from "formik";
import {
  useAddEmployeeHistory,
  useEditEmployeeHistory,
} from "../../../../hooks/employee/useEmployeeHistory";
import * as Yup from "yup";

const HistorySchema = Yup.object().shape({
  pastPosition: Yup.string().required("Past position is Required"),
  fromDate: Yup.string().required("From Date is Required"),
  toDate: Yup.string().required("To Date is Required"),
  employerName: Yup.string().required("Oraganization Name is Required"),
  employerAddress: Yup.string().required("Branch Address is Required"),
});

const useAddHistoryDetails = () => {
  const { addEmployee: addEmployeemutate, isSuccess: isFormSubmitSuccess } =
    useAddEmployeeHistory({});
  const { editHistoryMutate, isSuccess: isEditSuccess } =
    useEditEmployeeHistory({});

  const formik = useFormik({
    initialValues: {
      employerName: "",
      employerAddress: "",
      pastPosition: "",
      fromDate: "",
      toDate: "",
      remarks: "",
    },
    validationSchema: HistorySchema,
    onSubmit: (values) => {
      if (values?.id) {
        const formValues = {
          employerName: values.employerName,
          employerAddress: values.employerAddress,
          pastPosition: values.pastPosition,
          fromDate: values.fromDate,
          toDate: values.toDate,
          remarks: values.remarks,
          id: values.id,
        };
        editHistoryMutate(formValues, {
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

    addEmployeemutate(values, {
      onSuccess: () => {
        formik.handleReset();
      },
    });
  };

  return { formik, isFormSubmitSuccess, isEditSuccess };
};

export default useAddHistoryDetails;
