import * as Yup from "yup";
import { sub } from "date-fns/fp";

const AddEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required").max(25, "First name cannot be greater than 25 characters"),
  middleName: Yup.string().max(25, "Middle name cannot be greater than 25 characters"),
  lastName: Yup.string().required("Last name is required").max(25, "Last name cannot be greater than 25 characters"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .max(sub({ years: 18 }, new Date()), "Employee must be over 18 years old"),
  // dateOfJoin: Yup.string().required('Date of join is required'),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number format, must be 10 digits.")
    .matches(/^9[0-9]{9}$/, "Invalid mobile number format, must start with 9."),
  // .matches(/^[0-9]{10}$/, 'Invalid mobile number format'),
  citizenshipNumber: Yup.string()
    .matches(/^[0-9\/-]+$/, "Enter valid citizenship number")
    .required("Citizenship number is required").max(25, "Citizenship cannot be greater than 25 characters"),
  panNumber: Yup.string().matches(/^[0-9\/-]+$/, "Enter valid pan number").max(25, "Pan number cannot be greater than 25 characters"),
  officeEmail: Yup.string()
    .required("Office email is required")
    .max(50, "Office email cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  maritalStatus: Yup.string().required("Marital status is required"),
  remarks: Yup.string().max(255, "Remarks cannot be greater than 255 characters"),
  // branchId: Yup.string().required('Company name is required'),
  // positionId: Yup.string().required('Position is required'),
  // departmentId: Yup.string().required('Department is required'),
});

export { AddEmployeeSchema };
