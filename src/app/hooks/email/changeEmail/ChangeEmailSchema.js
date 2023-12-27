import * as Yup from 'yup';

const changeEmailSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Invalid email format')
    .required('New Email is required'),
  confirmEmail: Yup.string()
    .email('Invalid email format')
    .required('Confirm Email is required')
    .oneOf([Yup.ref('newEmail')], 'New Email and Confirm Email must match'),
});

export default changeEmailSchema;