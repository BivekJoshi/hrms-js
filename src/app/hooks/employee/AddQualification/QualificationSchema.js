import * as Yup from 'yup';

const QualificationSchema = Yup.object().shape({
  board: Yup.string().required('Board name is required'),
});

export { QualificationSchema };
