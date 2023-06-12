import * as Yup from 'yup';

const EditEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
});

export { EditEmployeeSchema };
