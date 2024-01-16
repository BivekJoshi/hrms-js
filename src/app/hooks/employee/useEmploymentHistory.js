import { useFormik } from "formik";
import {
  useAddEmploymentHistory,
  useTransferEmploymentHistory,
} from "./useEmployeeHistory";
import * as Yup from "yup";

const EmployeeSchema = Yup.object().shape({
  positionId: Yup.string().required("Position name is Required"),
  branchId: Yup.string().required("Branch is required"),
  departmentId: Yup.string().required("Department is Required"),
  effectiveDateFrom: Yup.string().required("From Date is Required"),
});

const useEmploymentHistory = (data,onClose) => {
  const { mutate } = useAddEmploymentHistory({});
  const {
    mutate: editTransferEmploymentHistory,
  } = useTransferEmploymentHistory({});
  console.log(data,"bivu jos");

  const formik = useFormik({
    initialValues: {
      positionId: data?.positionId||"",
      branchId: "",
      departmentId: "",
      effectiveDateFrom: "",
      // effectiveDateTo: "",
      remarks: "",
      multiplePosition: false,
    },
    validationSchema: EmployeeSchema,
    enableReinitialize:true,
    onSubmit: (values) => {
      if(data){
        handleEditRequest(values);
      }else{
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        onClose();
        formik.handleReset();
      },
    });
  };

  const handleEditRequest = (values) => {
    values = { ...values };
    editTransferEmploymentHistory(values, {
      onSuccess: () => {
        onClose();
        formik.handleReset();
      },
    });
  };

  return { formik };
};

export default useEmploymentHistory;
