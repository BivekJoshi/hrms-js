import * as Yup from "yup";

const OfficeResourceSchema = Yup.object().shape({
  name: Yup.string().required("Resource Name is required ").max(50, "Resource name cannot be greater than 50 characters"),
  uniqueNumber: Yup.string().required("Unique Number is required").max(50, "Unique name cannot be greater than 50 characters"),
  description: Yup.string().max(255, 'Description cannot be greater than 255 characters'),
});
export { OfficeResourceSchema };
