import * as Yup from "yup";

const TaskSchema = Yup.object().shape({
  projectTaskId: Yup.string().required("Please select priority for the to do"),
  projectEmployeeId: Yup.string().required("Please assign task to employee"),
});

export { TaskSchema };
