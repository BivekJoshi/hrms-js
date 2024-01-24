import * as Yup from "yup";

const OfficeResourceSchema = Yup.object().shape({
  name: Yup.string().required("Resource Name is required ").max(50, "Resource Name cannot be greater than 50 characters"),
  uniqueNumber: Yup.string().required("Identification Key is required").max(50, "Identification Key cannot be greater than 50 characters"),
  description: Yup.string().max(255, 'Description cannot be greater than 255 characters'),
});
export { OfficeResourceSchema };
