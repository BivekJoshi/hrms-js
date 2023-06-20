import { useFormik } from 'formik';
import { useEditCompany } from '../useCompany';
import { addCompanySchema } from '../addCompany/addCompanySchema';

const useEditCompanyForm = () => {
    const { mutate } = useEditCompany({});

    const formik = useFormik({
        initialValues: {
            companyName:'' ,
            companyType: '',
            companyDescription:'',
            id: '',
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
