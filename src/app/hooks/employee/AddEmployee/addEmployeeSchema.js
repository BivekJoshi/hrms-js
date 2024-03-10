import * as Yup from "yup";
import { sub } from "date-fns/fp";

const AddEmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
  .required("First Name is required")
  .max(25, "First Name cannot be greater than 25 characters")
  .matches(/^[A-Za-z]+$/, 'First Name must contain only letters'),
  middleName: Yup.string()
  .max(25, "Middle Name cannot be greater than 25 characters")
  .matches(/^[A-Za-z]+$/, 'Middle Name must contain only letters'),
  lastName: Yup.string()
  .required("Last Name is required")
  .max(25, "Last Name cannot be greater than 25 characters")
  .matches(/^[A-Za-z]+$/, 'Name must contain only letters'),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(sub({ years: 18 }, new Date()), "Employee must be over 18 years old"),
  // dateOfJoin: Yup.string().required('Date of join is required'),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number format, must be 10 digits.")
    .matches(/^9[0-9]{9}$/, "Invalid mobile number format, must start with 9."),
  // .matches(/^[0-9]{10}$/, 'Invalid mobile number format'),
  citizenshipNumber: Yup.string()
    .matches(/^[0-9\/-]+$/, "Enter valid citizenship number")
    .required("Citizenship Number is required")
    .max(25, "Citizenship Number cannot be greater than 25 characters"),
  panNumber: Yup.string()
  .matches(/^[0-9\/-]+$/, "Enter valid pan number")
  .max(25, "Pan number cannot be greater than 25 numbers"),
  officeEmail: Yup.string()
    .required("Office Email is required")
    .max(50, "Office Email cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  maritalStatus: Yup.string().required("Marital Status is required"),
  remarks: Yup.string().max(255, "Remarks cannot be greater than 255 characters"),
  // branchId: Yup.string().required('Company name is required'),
  // positionId: Yup.string().required('Position is required'),
  // departmentId: Yup.string().required('Department is required'),
});

export { AddEmployeeSchema };
