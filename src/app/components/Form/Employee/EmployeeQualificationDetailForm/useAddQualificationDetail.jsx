import { useFormik } from "formik";
import {
  useAddQualification,
  useEditQualification,
} from "../../../../hooks/employee/useQualification";
import * as Yup from "yup";

const QualificationSchema = Yup.object().shape({
  board: Yup.string()
    .required("Board name is required")
    .matches(/^[A-Za-z\s]+$/, "Board must only contain letters"),
  institute: Yup.string()
    .required("Institute is required")
    .matches(/^[A-Za-z\s]+$/, "Institute must only contain letters"),
  passedLevel: Yup.string().required("Enter pass level"),
  passedYear: Yup.string()?.nullable().required("Passed year is required"),
  grade: Yup.string()
    .required("Grade is required")
    .matches(
      /^(100(\.0{1,2})?%?|\d{0,2}(\.\d{1,2})?%?$|^[A-Ea-e](?:[+-])?)(?:\s?[A-Za-z+-])?$/,
      "Enter valid grade, percentage not greater than 100, or a letter grade (A to E) with optional + or - "
    ),
});

const useAddQualificationDetails = () => {
  const { addEmployee: addEmployeemutate, isSuccess: isFormSubmitSuccess } =
    useAddQualification({});

  const { editQualificationMutate, isSuccess: isEditSuccess } =
    useEditQualification({});

  const formik = useFormik({
    initialValues: {
      board: "",
      institute: "",
      passedLevel: "",
      passedYear: "",
      grade: "",
    },
    validationSchema: QualificationSchema,
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
