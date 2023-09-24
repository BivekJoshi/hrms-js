import * as Yup from "yup";

const EmployeeResourceSchema = Yup.object().shape({
  officeResourceId: Yup.mixed().required("Please Select Office Logistics"),
  employeeId: Yup.mixed().required("Please Select Employee name"),
  receiveDate: Yup.string().required("Please Select the Received Date"),
});
export { EmployeeResourceSchema };
