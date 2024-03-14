import * as Yup from "yup";

const DepartmentHistorySchema = Yup.object().shape({
  departmentId: Yup.string().required('Department Type is required'),
  effectiveFromDate: Yup.string().required('Effective From Date is required'),
  // effectiveToDate: Yup.string().required('Date is required'),
  employeeId: Yup.string().required('Employee is required'),
  // remarks: Yup.string().required('Remarks is required'),
});

export { DepartmentHistorySchema };