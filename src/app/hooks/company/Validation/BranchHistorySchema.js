import * as Yup from "yup";

const BranchHistorySchema = Yup.object().shape({
  branchId: Yup.string().required('Position is required'),
  effectiveFromDate: Yup.string().required('Date is required'),
  effectiveToDate: Yup.string().required('Date is required'),
  employeeId: Yup.string().required('Date is required'),
  // remarks: Yup.string().required('Remarks is required'),
});

export { BranchHistorySchema };
