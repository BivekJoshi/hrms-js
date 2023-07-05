import * as Yup from 'yup';

const CompanySchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is Required')
        .min(3, 'Company Name must be at least 3 characters')
        .matches(/^[^0-9]*$/, 'Company Name cannot contain numbers'),
    companyType: Yup.string().required('Company Type is Required'),
});

export { CompanySchema };
