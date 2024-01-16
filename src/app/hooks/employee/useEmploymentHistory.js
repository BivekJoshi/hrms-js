import { useFormik } from "formik";
import { useAddEmploymentHistory } from "./useEmployeeHistory";
import * as Yup from "yup";

const EmployeeSchema = Yup.object().shape({
  positionId: Yup.string().required("Position name is Required"),
  branchId: Yup.string().required("Branch is required"),
  departmentId: Yup.string().required("Department is Required"),
  effectiveDateFrom: Yup.string().required("From Date is Required"),
});

const useEmploymentHistory = (onClose) => {
  const { mutate } = useAddEmploymentHistory({});
  const formik = useFormik({
    initialValues: {
      positionId: "",
      branchId: "",
      departmentId: "",
      effectiveDateFrom: "",
      // effectiveDateTo: "",
      remarks: "",
      multiplePosition: false,
    },
    validationSchema: EmployeeSchema,
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
        onClose();
        formik.handleReset();
      },
    });
  };

  return { formik };
};

export default useEmploymentHistory;
