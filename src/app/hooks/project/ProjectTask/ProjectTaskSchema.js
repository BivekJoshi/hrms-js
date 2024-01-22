import * as Yup from "yup";

const ProjectTaskSchema = Yup.object().shape({
  name: Yup.string()
    .required("Task message is required")
    .min(3, "Message name must be at least 3 characters")
    .max(50, "Message name must be at least 50 characters"),
  detail: Yup.string()
    .required("Detail is required")
    .max(255, "Message name must be at least 255 characters"),
  priority: Yup.string().required("Please select priority"),
  status: Yup.string().required("Status is required"),
  dueDate: Yup.string().required("Please select due date "),
});

export { ProjectTaskSchema };
