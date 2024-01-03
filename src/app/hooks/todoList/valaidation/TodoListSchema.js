import * as Yup from "yup";

const TodoListSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message is required")
    .min(3, "Message name must be at least 3 characters"),
  dueDate: Yup.string().required("Due date is required"),
  priority: Yup.string().required("Please select priority"),
});

export { TodoListSchema };
