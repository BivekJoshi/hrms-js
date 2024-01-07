import * as Yup from 'yup';

const EmailSchema = Yup.object().shape({
    sender: Yup.string().required('Sender is required'),
    host: Yup.string().required('Host is required'),
    port: Yup.string().required('Port is required'),
    password: Yup.string().required('Password is required'),
    signature: Yup.string().required('Signature is required'),
});

export { EmailSchema };