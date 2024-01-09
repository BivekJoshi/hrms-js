import * as Yup from "yup";

const OfficeResourceSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter the Resource Name").max(50, "Resource name cannot be greater than 50 characters"),
  uniqueNumber: Yup.string().required("Please Enter the Unique Identification number for Office Logistics").max(50, "Unique name cannot be greater than 50 characters"),
  description: Yup.string().max(255, 'Description cannot be greater than 255 characters'),
});
export { OfficeResourceSchema };
