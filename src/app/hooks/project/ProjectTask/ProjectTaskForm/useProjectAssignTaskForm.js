import { useFormik } from "formik";
import { useEditProjectTaskAssign } from '../useProjectTask';
import { TaskSchema } from './TaskSchema';

const useProjectAssignTaskForm = (data, onClose) => {
  const { mutate: projectCreateTask } = useEditProjectTaskAssign({});

  const formik = useFormik({
    initialValues: {
      projectTaskId: data?.id||"",
      projectEmployeeId: "",
    },
    validationSchema: TaskSchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    projectCreateTask(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return { formik };
};

export default useProjectAssignTaskForm;
