import * as Yup from "yup";

const EditEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  // dateOfJoin: Yup.string().required("Date of join is required"),
  mobileNumber: Yup.string()
  .required('Mobile number is required')
  .matches(/^[0-9]{10}$/, 'Invalid mobile number format, must be 10 digits.')
  .matches(/^9[0-9]{9}$/, 'Invalid mobile number format, must start with 9.'),
  
  citizenshipNumber: Yup.string()
    .matches(/^[0-9\/-]+$/, "Enter valid citizenship number")
    .required("Citizenship number is required"),
  panNumber: Yup.string().matches(/^[0-9\/-]+$/, "Enter valid pan number"),
  officeEmail: Yup.string().required("Official email is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  remarks: Yup.string().max(255, "Remarks cannot be greater than 255 characters")
  // branchId: Yup.string().required("Branch name is required"),
  // positionId: Yup.string().required("Position is required"),
  // departmentId: Yup.string().required("Department is required"),
  // employmentType: Yup.string().required("Employment type is required"),
  // shifttype: Yup.string().required("Shift type is required"),
});

export { EditEmployeeSchema };
