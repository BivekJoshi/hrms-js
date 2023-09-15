import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
  .required('Email is required')
  .matches(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    'Invalid email format'
  ),
  password: Yup.string().required('Required'),
});

export { loginSchema };
