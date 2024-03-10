import * as Yup from 'yup';

const OfficeEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  dateOfJoin: Yup.string().required('Date of Join is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  citizenshipNumber: Yup.string().matches(/^[0-9\/-]+$/, 'Enter valid citizenship number').required('Citizenship Number is required'),
  panNumber: Yup.string().matches(/^[0-9\/-]+$/, 'Enter valid pan number'),
  officeEmail: Yup.string().required('Official Email is required'),
  maritalStatus: Yup.string().required('Marital Status is required'),
  branchId: Yup.string().required('Branch Name is required'),
  positionId: Yup.string().required('Position is required'),
  departmentId: Yup.string().required('Department Type is required'),
});

export { OfficeEmployeeSchema };
