import * as Yup from 'yup';

const TrainingSchema = Yup.object().shape({
  trainingName: Yup.string().required('Training name is required'),
  trainingLevel: Yup.string().required('Training level is required'),
  trainingInstitute: Yup.string().required('Training institute is required'),
  category: Yup.string().required('Category is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string()
    .required('End date is required')
    .test(
      'is-greater-or-equal',
      'End date must be greater than or equal to start date',
      function (endDate) {
        const startDate = this.parent.startDate;
        if (!startDate || !endDate) {
          // Return true if either date is missing to let the required validation handle it
          return true;
        }

        // Compare dates
        return new Date(endDate) >= new Date(startDate);
      }
    ),
});

export { TrainingSchema };
