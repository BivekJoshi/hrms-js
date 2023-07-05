import { useFormik } from 'formik';
import { useAddCompany } from '../useCompany';
import { CompanySchema } from '../Validation/CompanySchema';

const useAddCompanyForm = () => {
    const { mutate } = useAddCompany({});

    const formik = useFormik({
        initialValues: {
            companyName: '',
            companyType: '',
            companyDescription: '',
        },
        validationSchema: CompanySchema,
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
