import * as Yup from 'yup';

const addEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
});

export { addEmployeeSchema };
