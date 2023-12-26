import * as Yup from "yup";

const TodoListSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message can't be empty")
    .min(3, "Message name must be at least 3 characters"),
  dueDate: Yup.string().required("Due date is required"),
  priority: Yup.string().required("Please select priroty"),
});

export { TodoListSchema };
