import * as Yup from 'yup';

const TrainingSchema = Yup.object().shape({
  trainingName: Yup.string().required('Training name is required').max(50, 'Training name cannot be greater than 50  characters'),
  trainingLevel: Yup.string().required('Training level is required').max(50, 'Training level cannot be greater than 50  characters'),
  trainingInstitute: Yup.string().required('Training institute is required').max(50, 'Training institute cannot be greater than 50 characters').min(8, 'Training institute must be at least 8 characters'),
  category: Yup.string().required('Category is required').max(50, 'Training category cannot be greater than 50  characters'),
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
