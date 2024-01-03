import * as Yup from "yup";

const EditEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  dateOfJoin: Yup.string().required("Date of join is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  citizenshipNumber: Yup.string()
    .matches(/^[0-9\/-]+$/, "Enter valid citizenship number")
    .required("Citizenship number is required"),
  panNumber: Yup.string().matches(/^[0-9\/-]+$/, "Enter valid pan number"),
  officeEmail: Yup.string().required("Official email is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  // branchId: Yup.string().required("Branch name is required"),
  // positionId: Yup.string().required("Position is required"),
  // departmentId: Yup.string().required("Department is required"),
  // employmentType: Yup.string().required("Employment type is required"),
  // shifttype: Yup.string().required("Shift type is required"),
});

export { EditEmployeeSchema };
