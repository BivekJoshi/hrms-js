import * as Yup from 'yup';

const TrainingSchema = Yup.object().shape({
  trainingName: Yup.string().required('Training name is required'),
  trainingLevel: Yup.string().required('Training level is required'),
  trainingInstitute: Yup.string().required('Training institute is required'),
  category: Yup.string().required('Category is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string()
    .required('End date is required')
    // .when('startDate', (startDate, schema) => {
    //   return schema.min(startDate, 'End date must not be less than start date');
    // }),
});

export { TrainingSchema };
