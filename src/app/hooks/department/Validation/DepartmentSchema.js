import * as Yup from 'yup';

const DepartmentSchema = Yup.object().shape({
  departmentName: Yup.string()
    .required('Department name is required')
    .min(3, 'Department name must be at least 3 characters')
    .max(50, 'Department name cannot be greater than 50 characters')
    .matches(/^[^0-9]*$/, 'Branch name cannot contain numbers'),
  departmentType: Yup.string().required('Department type is required'),
  departmentDescription: Yup.string().max(255, 'Department description cannot be greater than 255 characters'),

});

export { DepartmentSchema };
