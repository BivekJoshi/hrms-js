import * as Yup from 'yup';

const DepartmentSchema = Yup.object().shape({
    departmentName: Yup.string().required('Department Name is Required')
        .min(3, 'Department Name must be at least 3 characters'),
    departmentType: Yup.string().required('Department Type is Required'),
});

export { DepartmentSchema };