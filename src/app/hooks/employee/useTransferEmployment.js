import { useFormik } from "formik";
import { useTransferEmploymentHistory } from "./useEmployeeHistory";
import * as Yup from "yup";

// const EmployeeSchema = Yup.object().shape({
//   positionId: Yup.string().required("Organization name is Required"),
//   branchId: Yup.string().required("Organization address is required"),
//   departmentId: Yup.string().required("Past Position is Required"),
//   effectiveDateFrom: Yup.string().required("From Date is Required"),
// });

const useTransferEmployment = (data, handleSuccess) => {
  const { mutate } = useTransferEmploymentHistory({});
  const activeData = data?.filter((item) => item?.isActive === true);
  const formik = useFormik({
    initialValues: {
      id: activeData?.id || "",
      positionId: "",
      fromBranch: activeData[0]?.branch?.id || "",
      fromDepartment: activeData[0]?.department?.id || "",
      fromPosition: activeData[0]?.position?.id || "",
      branchId: "",
      changePosition: false,
      departmentId: "",
      effectiveDateFrom: "",
      effectiveDateTo: "",
      remarks: "",
      transferEmployee: false,
    },
    // validationSchema: EmployeeSchema,
    enableReinitialize: true,
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
        handleSuccess();
        formik.handleReset();
      },
    });
  };

  return { formik };
};
export default useTransferEmployment;
