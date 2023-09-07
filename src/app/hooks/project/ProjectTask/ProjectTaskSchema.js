import * as Yup from "yup";

const ProjectTaskSchema = Yup.object().shape({
  name: Yup.string()
    .required("Message can't be empty")
    .min(3, "Message Name must be at least 3 characters"),
  dueDate: Yup.string().required("Due Date is Required"),
  priority: Yup.string().required("Please select Priroty for the to do"),
  detail: Yup.string().required("Please Fill the Detail"),
});

export { ProjectTaskSchema };