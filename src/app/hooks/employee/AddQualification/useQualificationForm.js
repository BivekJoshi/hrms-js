import { useFormik } from 'formik';
import { QualificationSchema } from './QualificationSchema';
import { useAddQualification } from '../useQualification';

const useQualificationForm = () => {
  const { mutate } = useAddQualification({});

  const formik = useFormik({
    initialValues: {
      education: [{
        board: '',
        institute: '',
        passedLevel: '',
        passedYear: '',
        grade: '',
      }]
    },
    validationSchema: QualificationSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    console.log(values);
    values = { ...values };
    mutate(values);
  };
  return { formik };
};

export default useQualificationForm;
