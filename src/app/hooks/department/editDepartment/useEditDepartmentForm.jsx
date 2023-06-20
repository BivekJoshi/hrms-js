import { useFormik } from 'formik';
import { DepartmentSchema } from '../Validation/DepartmentSchema';
import { useEditDepartment } from '../useDepartment';

const useEditDepartmentForm = (data) => {
    const { mutate } = useEditDepartment({});

    const formik = useFormik({
        initialValues: {
            departmentName: data?.departmentName || '',
            departmentType: data?.departmentType || '',
            departmentDescription: data?.departmentDescription || '',
            id: data?.id,
        },
        validationSchema: DepartmentSchema,
        enableReinitialize: 'true',

        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    };

    return { formik };
};

export default useEditDepartmentForm;
