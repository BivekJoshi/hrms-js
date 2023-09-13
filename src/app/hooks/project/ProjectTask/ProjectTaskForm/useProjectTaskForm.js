import { useFormik } from "formik";
import { ProjectTaskSchema } from "../ProjectTaskSchema";
import { useAddCreateTask } from "../useProjectTask";
import { useParams } from "react-router-dom";

const useProjectTaskForm = () => {
  const { mutate: projectCreateTask } = useAddCreateTask({});
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      detail: "",
      priority: "",
      status: "",
      dueDate: "",
      projectId: parseInt(id) || "",
    },
    validationSchema: ProjectTaskSchema,
    enableReinitialize: "true",

    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    projectCreateTask(values, formik);
  };

  return { formik };
};

export default useProjectTaskForm;
