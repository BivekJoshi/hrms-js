import { useFormik } from "formik";
import { useTransferUpgradeEmployee } from "./useEmployeeHistory";

import * as yup from "yup";

const schema = yup.object().shape({
  effectiveDateFrom: yup.string().required("Effective date is required"),
  branchId: yup.string().required("Branch is required"),
  departmentId: yup.string().required("Department is required"),
  allPosition: yup.boolean(),
  positionId: yup.string().when("allPosition", {
    is: false,
    then: yup.string().required("Position is required"),
    otherwise: yup.string(),
  }),
});

const useEmployeeTransferUpgrade = (handleSuccess) => {
  const { mutate } = useTransferUpgradeEmployee({});
  const formik = useFormik({
    initialValues: {
      positionId: "",
      branchId: "",
      departmentId: "",
      allPosition: true,
      effectiveDateFrom: "",
      remarks: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      mutate(value, {
        onSuccess: () => {
          handleSuccess();
          formik.handleReset();
        },
      });
    },
  });

  return { formik };
};
export default useEmployeeTransferUpgrade;
