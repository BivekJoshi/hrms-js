import * as Yup from "yup";

const OfficeResourceSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter the Resource Name"),
  uniqueNumber: Yup.string().required("Please Enter the Unique Identification number for Office Logistics"),
});
export { OfficeResourceSchema };
