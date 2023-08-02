import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.')
});

export { ResetPasswordSchema };
