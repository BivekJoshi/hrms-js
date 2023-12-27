import * as Yup from 'yup';
import { sub } from 'date-fns/fp';

const AddEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .max(sub({ years: 18 }, new Date()), 'Employee must be over 18 years old'),
  dateOfJoin: Yup.string().required('Date of join is required'),
  mobileNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number format'),
  citizenshipNumber: Yup.string().matches(/^[0-9\/-]+$/, 'Enter valid citizenship number').required('Citizenship number is required'),
  panNumber: Yup.string().matches(/^[0-9\/-]+$/, 'Enter valid pan number'),
  officeEmail: Yup.string()
    .required('Official email is required')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid email format'
    ),
  maritalStatus: Yup.string().required('Marital status is required'),
  branchId: Yup.string().required('Company name is required'),
  positionId: Yup.string().required('Position is required'),
  departmentId: Yup.string().required('Department is required'),
});

export { AddEmployeeSchema };
