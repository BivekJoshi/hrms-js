import * as Yup from 'yup';
const EmploymentSchema = Yup.object().shape({
  history: Yup.array().of(
    Yup.object().shape({
      positionId: Yup.string().required('Organization Name is required'),
      branchId: Yup.string().required('Organization Address is required'),
      departmentId: Yup.string().required('Past Position is required'),
      employeeId: Yup.string().required('From Date is required'),
      toDate: Yup.string().required('To Date is required'),
      description: Yup.string().required('Description is required'),
      remarks: Yup.string().required('Remarks is required'),
    })
  ),
});
export default EmploymentSchema;
