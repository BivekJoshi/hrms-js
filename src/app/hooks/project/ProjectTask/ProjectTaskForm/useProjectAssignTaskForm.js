import { useFormik } from "formik";
import { useEditProjectTaskAssign } from "../useProjectTask";

const useProjectAssignTaskForm = ({id}) => {
  const { mutate: projectCreateTask } = useEditProjectTaskAssign({id});

  const formik = useFormik({
    initialValues: {
      projectTaskId: "",
      projectEmployeeId: "",
    },
    // validationSchema: ProjectTaskSchema,
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

export default useProjectAssignTaskForm;
