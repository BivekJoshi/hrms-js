import * as Yup from 'yup';
const EmploymentSchema = Yup.object().shape({
  history: Yup.array().of(
    Yup.object().shape({
      positionId: Yup.string().required('Organization name is Required'),
      branchId: Yup.string().required('Organization address is required'),
      departmentId: Yup.string().required('Past Position is Required'),
      employeeId: Yup.string().required('From Date is Required'),
      toDate: Yup.string().required('To Date is required'),
      description: Yup.string().required('Description is required'),
      remarks: Yup.string().required('Remark is required'),
    })
  ),
});
export default EmploymentSchema;
