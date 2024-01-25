import { useFormik } from "formik";
import {
  useAddEmployeeHistory,
  useEditEmployeeHistory,
} from "../../../../hooks/employee/useEmployeeHistory";
import * as Yup from "yup";

const HistorySchema = Yup.object().shape({
  pastPosition: Yup.string()
    .required("Past Position is Required")
    .max(25, "Position name cannot be greater than 25 characters")
    .min(3, "Position name cannot be less than 3 characheter"),
  fromDate: Yup.string().required("From date is required"),
  toDate: Yup.string().required("To date is required"),
  employerName: Yup.string()
    .required("Organization name is Required")
    .max(50, "Organization name cannot be greater than 50 characters")
    .min(3, "Organaization name cannot be less than 3 characheter"),
  employerAddress: Yup.string()
    .required("Organization address is required")
    .max(100, "Organization address cannot be greater than 100 characters"),
  remarks: Yup.string().max(255, "Remarksc than 255 characters"),
});

const useAddHistoryDetails = () => {
  const {
    addEmployee: addEmployeemutate,
    isSuccess: isFormSubmitSuccess,
  } = useAddEmployeeHistory({});
  const {
    editHistoryMutate,
    isSuccess: isEditSuccess,
  } = useEditEmployeeHistory({});

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
