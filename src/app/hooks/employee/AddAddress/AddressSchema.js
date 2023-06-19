import * as Yup from 'yup';

const AddressSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  province: Yup.string().required('Province is required'),
  district: Yup.string().required('District is required'),
  wardNumber: Yup.string().required('Ward number is required'),
  city: Yup.string().required('City is required'),
  street: Yup.string().required('Street is required'),
});

export { AddressSchema };
