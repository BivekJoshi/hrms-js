import * as Yup from "yup";

const ProjectTaskSchema = Yup.object().shape({
  name: Yup.string()
    .required("Task message is required")
    .min(3, "Task message must be at least 3 characters")
    .max(50, "Task message must be at least 50 characters"),
  detail: Yup.string()
    .required("Detail is required")
    .max(255, "Detail cannot exceed 255 characters"),
  priority: Yup.string().required("Please select priority"),
  status: Yup.string().required("Status is required"),
  dueDate: Yup.string().required("Please select due date "),
});

export { ProjectTaskSchema };
