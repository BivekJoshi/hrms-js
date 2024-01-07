import * as Yup from "yup";

const ProjectTaskSchema = Yup.object().shape({
  name: Yup.string()
    .required("Message can't be empty")
    .min(3, "Message name must be at least 3 characters"),
  dueDate: Yup.string().required("Due date is required"),
  priority: Yup.string().required("Please select priority for the to do"),
  detail: Yup.string().required("Please fill the detail"),
});

export { ProjectTaskSchema };
