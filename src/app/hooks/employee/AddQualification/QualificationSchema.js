import * as Yup from 'yup';

const QualificationSchema = Yup.object().shape({
  education: Yup.array()
    .of(
      Yup.object().shape({
        board: Yup.string().matches(/^[A-Za-z\s]+$/, 'Board must only contain letters').required('Board name is required'),
        institute: Yup.string().matches(/^[A-Za-z\s]+$/, 'Institute must only contain letters').required('Institute is required'),
        passedLevel: Yup.string().matches(/^[A-Za-z\s]+$/, 'Education level must only contain letters').required('Enter pass level'),
        passedYear: Yup.string().required('Passed year is required'),
        grade: Yup.string().required('Grade is required'),
      })
    )
    .min(1, 'Need at least a family'),
});

export { QualificationSchema };
3224