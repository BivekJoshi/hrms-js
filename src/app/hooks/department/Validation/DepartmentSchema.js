import * as Yup from 'yup';

const DepartmentSchema = Yup.object().shape({
  departmentName: Yup.string()
    .required('Department name is required')
    .min(2, 'Department name must be at least 3 characters')
    .matches(/^[^0-9]*$/, 'Branch name cannot contain numbers'),
  departmentType: Yup.string().required('Department type is required'),
  // departmentDescription: Yup.string().required("Department details is required"),

});

export { DepartmentSchema };
