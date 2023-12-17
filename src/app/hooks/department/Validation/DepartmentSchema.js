import * as Yup from 'yup';

const DepartmentSchema = Yup.object().shape({
  departmentName: Yup.string()
    .required('Department Name is Required')
    .min(2, 'Department Name must be at least 3 characters')
    .matches(/^[^0-9]*$/, 'Branch Name cannot contain numbers'),
  departmentType: Yup.string().required('Department Type is Required'),
});

export { DepartmentSchema };
