import * as Yup from 'yup';

const DepartmentSchema = Yup.object().shape({
  departmentName: Yup.string()
    .required('Department Name is required')
    .min(3, 'Department Name must be at least 3 characters')
    .max(50, 'Department Name cannot be greater than 50 characters')
    .matches(/^[^0-9]*$/, 'Department Name cannot contain numbers'),
  departmentType: Yup.string().required('Department Type is required'),
  departmentDescription: Yup.string().max(255, 'Description cannot be greater than 255 characters'),

});

export { DepartmentSchema };
