import { useFormik } from 'formik';
import { ProjectTaskSchema } from '../ProjectTaskSchema';
import { useAddCreateTask } from '../useProjectTask';

const useProjectTaskForm = () => {
    const { mutate : projectCreateTask} = useAddCreateTask({});

    const formik = useFormik({
        initialValues: {
            name:"",
            detail:"",
            priority:"",
            status:"",
            dueDtae:"",
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