import * as Yup from "yup";

const TodoListSchema = Yup.object().shape({
  message: Yup.string()
    .required("Message is required")
    .min(3, "Message must be at least 3 characters")
    .max(255, "Message cannot be greater than 255 characters"),
  dueDate: Yup.string().required("Please select due date "),
  priority: Yup.string().required("Please select priority"),
});

export { TodoListSchema };
