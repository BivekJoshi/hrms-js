import { useFormik } from 'formik';
import { useEditCompany } from '../useCompany';
import { CompanySchema } from '../Validation/CompanySchema';

const useEditCompanyForm = (data) => {
    const { mutate } = useEditCompany({});

    const formik = useFormik({
        initialValues: {
            companyName: data?.companyName || '',
            companyType: data?.companyType || '',
            companyDescription: data?.companyDescription || '',
            id: data?.companyId,
        },
        validationSchema: CompanySchema,
        enableReinitialize: 'true',
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    };

    return { formik };
};

export default useEditCompanyForm;
