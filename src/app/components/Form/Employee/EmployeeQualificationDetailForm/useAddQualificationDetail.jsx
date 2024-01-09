import { useFormik } from "formik";
import {
  useAddQualification,
  useEditQualification,
} from "../../../../hooks/employee/useQualification";

const useAddQualificationDetails = () => {
  const {
    addEmployee: addEmployeemutate,
    isSuccess: isFormSubmitSuccess,
  } = useAddQualification({});

  const {
    editQualificationMutate,
    isSuccess: isEditSuccess,
  } = useEditQualification({});

  const formik = useFormik({
    initialValues: {
      board: "",
      institute: "",
      passedLevel: "",
      passedYear: "",
      grade: "",
    },
    // validationSchema: PositionSchema,
    onSubmit: (values) => {
      if (values?.id) {
        editQualificationMutate(values, {
          onSuccess: () => {
            formik.handleReset();
          },
        });
      } else handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };

    addEmployeemutate(values, {
      onSuccess: () => {
        formik.handleReset();
      },
    });
  };

  return { formik, isFormSubmitSuccess, isEditSuccess };
};

export default useAddQualificationDetails;
