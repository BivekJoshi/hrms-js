import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAddForgotPassword } from '../usePassword';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

const useAddForgotPasswordForm = () => {
    const { mutate } = useAddForgotPassword({});

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = {
            ...values,
        };
        mutate(values, formik, { onSuccess: () => formik.handleReset() });
    };

    return { formik };
};

export default useAddForgotPasswordForm;