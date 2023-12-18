import * as Yup from 'yup';

const EditEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  dateOfJoin: Yup.string().required('Date of join is required'),
  mobileNumber: Yup.string().required('Mobile number is required'),
  citizenshipNumber: Yup.string().required('Citizenship number is required'),
  panNumber: Yup.string().required('PAN number is required'),
  officeEmail: Yup.string().required('Official email is required'),
  maritalStatus: Yup.string().required('Marital status is required'),
  branchId: Yup.string().required('Branch name is required'),
  positionId: Yup.string().required('Position is required'),
  departmentId: Yup.string().required('Department is required'),
});

export { EditEmployeeSchema };
