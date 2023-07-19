import * as Yup from 'yup';
import {
  ageRegex,
  onlyTextRegex,
} from '../../../../validation/validationRegex';

const AddressSchema = Yup.object().shape({
  addresses: Yup.array().of(
    Yup.object().shape({
      country: Yup.string()
        .when('_', {
          is: (_, schema) => schema?.path.startsWith('addresses[0]'),
          then: Yup.string()
            .required('Country is required')
            .matches(onlyTextRegex, ''),
        })
        .matches(onlyTextRegex, ''),
      province: Yup.string()
        .when('_', {
          is: (_, schema) => schema?.path.startsWith('addresses[0]'),
          then: Yup.string().required('Province is required'),
        }),
      district: Yup.string()
        .when('_', {
          is: (_, schema) => schema?.path.startsWith('addresses[0]'),
          then: Yup.string().required('District is required'),
        }),
      wardNumber: Yup.string()
        .when('_', {
          is: (_, schema) => schema?.path.startsWith('addresses[0]'),
          then: Yup.string()
            .required('Ward number is required')
            .matches(ageRegex, 'Enter a valid ward number'),
        })
        .matches(ageRegex, 'Enter a valid ward number'),
      city: Yup.string()
        .when('_', {
          is: (_, schema) => schema?.path.startsWith('addresses[0]'),
          then: Yup.string().required('City is required'),
        }),
      street: Yup.string()
        .when('_', {
          is: (_, schema) => schema?.path.startsWith('addresses[0]'),
          then: Yup.string().required('Street is required'),
        }),
    })
  ),
});

export { AddressSchema };
