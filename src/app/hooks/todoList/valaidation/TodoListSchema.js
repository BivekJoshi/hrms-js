import * as Yup from "yup";

const TodoListSchema = Yup.object().shape({
  message: Yup.string()
    .required("Todo message is required")
    .min(3, "Todo message name must be at least 3 characters"),
  dueDate: Yup.string().required("Due date is required"),
  priority: Yup.string().required("Please select priority"),
});

export { TodoListSchema };
