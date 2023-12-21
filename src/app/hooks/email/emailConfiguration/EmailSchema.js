import * as Yup from 'yup';

const EmailSchema = Yup.object().shape({
    sender: Yup.string().required('Sender is required'),
    host: Yup.string().required('host is required'),
    port: Yup.string().required('port is required'),
    password: Yup.string().required('password is required'),
    signature: Yup.string().required('signature is required'),
});

export { EmailSchema };