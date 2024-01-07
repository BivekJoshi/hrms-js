import * as Yup from "yup";

const EmployeeResourceSchema = Yup.object().shape({
  officeResourceId: Yup.string().required("Please select office logistics"),
  employeeId: Yup.string().required("Please select employee name"),
  receiveDate: Yup.string().required("Please select the received date"),
});
export { EmployeeResourceSchema };
