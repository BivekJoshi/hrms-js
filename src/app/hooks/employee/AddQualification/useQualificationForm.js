import { useFormik } from 'formik';
import { QualificationSchema } from './QualificationSchema';
import { useAddQualification, useEditQualification } from '../useQualification';

const useQualificationForm = ({ data, isLoadingQualification: isLoading }) => {
  const { mutate } = useAddQualification({});

  const { mutate: editMutate } = useEditQualification({})

  const qualificationDetails =
    !isLoading &&
    data?.qualifications.map((education) => ({
      id: education?.id || '',
      board: education.board || '',
      institute: education.institute || '',
      passedLevel: education.passedLevel || '',
      passedYear: education.passedYear || '',
      grade: education.grade || '',
    }));

  const formik = useFormik({
    initialValues: {
      education: qualificationDetails &&
        qualificationDetails.length > 0 ?
        qualificationDetails :
        [
          {
            board: '',
            institute: '',
            passedLevel: '',
            passedYear: '',
            grade: '',
          }
        ],
    },
    enableReinitialize: "true",
    validationSchema: QualificationSchema,
    onSubmit: (values) => {
      if (qualificationDetails.length > 0) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, formik);
  };
  return { formik };
};

export default useQualificationForm;
