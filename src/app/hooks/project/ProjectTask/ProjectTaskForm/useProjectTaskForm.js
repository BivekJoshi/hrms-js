import { useFormik } from 'formik';
import { useAddProjectEmployeeCreateTask } from '../../projectEmployee/useProjectEmployee';
import { ProjectTaskSchema } from '../ProjectTaskSchema';

const useProjectTaskForm = (data) => {
    const { mutate : projectCreateTask} = useAddProjectEmployeeCreateTask({});

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