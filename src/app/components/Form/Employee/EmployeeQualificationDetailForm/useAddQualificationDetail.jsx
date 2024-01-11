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
  passedYear: Yup.mixed().required("Passed year is required"),
  scoreType: Yup.string()?.nullable().required("Score type is required"),
  grade: Yup.string().when("scoreType", {
    is: (scoreType) => scoreType === "PERCENT",
    then: Yup.string()
      .matches(
        /^(100(\.0{1,2})?|\d{0,2}(\.\d{1,2})?)$/,
        "Enter valid percentage not greater than 100"
      )
      .test(
        "min-percentage",
        "Percentage must not be lower than 32",
        function (value) {
          return !value || parseFloat(value) >= 32;
        }
      )
      .notRequired(),
    otherwise: Yup.string()
      .matches(
        /^(4(\.0{1,2})?|[0-3](\.\d{1,2})?)$/,
        "Enter valid CGPA not greater than 4.0"
      )
      .notRequired(),
  }),
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
      scoreType: "",
      grade: "",
    },
    validationSchema: QualificationSchema,
    onSubmit: (values) => {
      if (values?.id) {
        const submitValue = {
          board: values?.board,
          institute: values.institute,
          passedLevel: values.passedLevel,
          passedYear: values.passedYear,
          grade: values.grade,
          id: values?.id,
          scoreType: values?.scoreType,
        };
        editQualificationMutate(submitValue, {
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
