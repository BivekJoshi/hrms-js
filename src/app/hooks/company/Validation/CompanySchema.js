import * as Yup from 'yup';

const CompanySchema = Yup.object().shape({
  companyName: Yup.string()
    .required('Branch Name is Required')
    .min(3, 'Branch Name must be at least 3 characters')
    .matches(/^[^0-9]*$/, 'Branch Name cannot contain numbers'),
  companyType: Yup.string().required('Branch Type is Required'),
});

export { CompanySchema };
