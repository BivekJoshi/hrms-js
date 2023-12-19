import { useFormik } from 'formik';
import { QualificationSchema } from './QualificationSchema';
import {
  useAddQualification,
  useEditQualification,
  useGetQualificationById,
} from '../useQualification';
import { useParams } from 'react-router-dom';

const useQualificationForm = () => {
  const { id } = useParams();
  const { mutate } = useAddQualification({});
  const { data, isLoading } = useGetQualificationById(id);
  const { mutate: editMutate } = useEditQualification({});

  const qualificationDetails =
    !isLoading &&
    data?.map((education) => ({
      id: education?.id || '',
      board: education.board || '',
      institute: education.institute || '',
      passedLevel: education.passedLevel || '',
      passedYear: education.passedYear || '',
      grade: education.grade || '',
    }));

  const formik = useFormik({
    initialValues: {
      education:
        qualificationDetails && qualificationDetails.length > 0
          ? qualificationDetails
          : [
              {
                board: '',
                institute: '',
                passedLevel: '',
                passedYear: '',
                grade: '',
              },
            ],
    },
    enableReinitialize: 'true',
    validationSchema: QualificationSchema,
    onSubmit: (values) => {
      if (values.education.some((edu) => !edu.id)) {
        handleRequest(values);
      } else {
        handledEditRequest(values);
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
