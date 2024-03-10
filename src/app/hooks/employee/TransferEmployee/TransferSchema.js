import * as Yup from "yup";

export const TransferSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
  positionId: Yup.string().required("Position ID is required"),
  fromBranch: Yup.string().required("From Branch is required"),
  fromDepartment: Yup.string().required("From Department is required"),
  fromPosition: Yup.string().required("From Position is required"),
  branchId: Yup.string().required("Branch ID is required"),
  changePosition: Yup.boolean().required("Change Position is required"),
  departmentId: Yup.string().required("Department ID is required"),
  effectiveDateFrom: Yup.date()
    .required("Effective Date From is required")
    .nullable(),
  effectiveDateTo: Yup.date()
    .required("Effective Date To is required")
    .nullable(),
  remarks: Yup.string().required("Remarks is required"),
  transferEmployee: Yup.boolean().required("Transfer Employee is required"),
});
