import { useFormik } from 'formik';
import { useAddCompany } from './useCompany';
import { addCompanySchema } from './addCompanySchema';

const useAddCompanyForm = () => {
    const { mutate } = useAddCompany({});

    const formik = useFormik({
        initialValues: {
            companyName: '',
            companyType: '',
            companyDescription: '',
        },
        validationSchema: addCompanySchema,
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

export default useAddCompanyForm;
