import { useFormik } from 'formik';
import { useEditCompany } from '../useCompany';
import { addCompanySchema } from '../addCompany/addCompanySchema';

const useEditCompanyForm = (data) => {
    const { mutate } = useEditCompany({});
    // console.log(data)
    const formik = useFormik({
        initialValues: {
            companyName: data?.companyName || '',
            companyType: data?.companyType || '',
            companyDescription: data?.companyDescription || '',
        },
        validationSchema: addCompanySchema,
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
