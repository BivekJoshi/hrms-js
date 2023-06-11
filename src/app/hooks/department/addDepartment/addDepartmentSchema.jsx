import * as Yup from 'yup';

const addDepartmentSchema = Yup.object().shape({
    departmentName: Yup.string().required('Department Name is Required')
        .min(3, 'Department Name must be at least 3 characters')
        .matches(/^[^0-9]*$/, 'Department Name cannot contain numbers'),
    departmentType: Yup.string().required('Department Type is Required'),
});

export { addDepartmentSchema };
