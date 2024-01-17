import * as Yup from 'yup';

const BranchHistorySchema = Yup.object().shape({
  branchId: Yup.string().required('Branch is required'),
  effectiveFromDate: Yup.string().required('Date is required'),
  // effectiveToDate: Yup.string().required('Date is required'),
  employeeId: Yup.string().required('Employee is required'),
  // remarks: Yup.string().required('Remarks is required'),
  remarks: Yup.string().max(255, `Maximum ${255} characters allowed`),
});

export { BranchHistorySchema };
