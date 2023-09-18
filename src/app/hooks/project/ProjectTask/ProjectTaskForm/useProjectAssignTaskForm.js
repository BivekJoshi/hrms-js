import { useFormik } from "formik";
import { useEditProjectTaskAssign } from "../useProjectTask";

const useProjectAssignTaskForm = ({data}) => {
  const { mutate: projectCreateTask } = useEditProjectTaskAssign({});

  const formik = useFormik({
    initialValues: {
      projectTaskId: data?.id||"",
      projectEmployeeId: "",
    },
    // validationSchema: ProjectTaskSchema,
    enableReinitialize: true,

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
