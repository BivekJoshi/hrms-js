import { useFormik } from "formik";
import { ProjectTaskSchema } from "../ProjectTaskSchema";
import { useAddCreateTask, useEditCreateTask,} from "../useProjectTask";
import { useParams } from "react-router-dom";
import { getProjectTask } from "../../../../api/project/projectTask-api";

const useProjectTaskForm = (data, onClose) => {
  const taskId=data?.id;  
  const { id } = useParams();
  const { mutate: addprojectCreateTask } = useAddCreateTask({});
  const { mutate: editprojectCreateTask } = useEditCreateTask({taskId});

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      detail: data?.detail || "",
      priority: data?.priority || "",
      status: data?.status || "WORK_IN_PROGRESS",
      dueDate: data?.dueDate || "",
      projectId: parseInt(id) || data?.projectId || "",
      id: data?.id || "",
    },
    validationSchema: ProjectTaskSchema,
    enableReinitialize: "true",
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    const formData={...values};
    addprojectCreateTask(formData,{
      onSuccess:(data)=>{
        onClose();
        formik.resetForm();
      
      }
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editprojectCreateTask(values, {
      onSuccess:(data)=>{
        onClose();
        formik.resetForm();
      
      }
    });
  };
  return { formik };
};

export default useProjectTaskForm;
