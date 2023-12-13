import * as Yup from "yup";

const EmployeeResourceSchema = Yup.object().shape({
  officeResourceId: Yup.string().required("Please Select Office Logistics"),
  employeeId: Yup.string().required("Please Select Employee name"),
  receiveDate: Yup.string().required("Please Select the Received Date"),
  returnDate: Yup.string().required("Please Select the Received Date"),
});
export { EmployeeResourceSchema };
