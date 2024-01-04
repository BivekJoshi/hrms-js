import * as Yup from "yup";

const QualificationSchema = Yup.object().shape({
  education: Yup.array()
    .of(
      Yup.object().shape({
        board: Yup.string()
          .required("Board name is required")
          .matches(/^[A-Za-z\s]+$/, "Board must only contain letters"),
        institute: Yup.string()
          .required("Institute is required")
          .matches(/^[A-Za-z\s]+$/, "Institute must only contain letters"),
        passedLevel: Yup.string()
          .required("Enter pass level"),
          // .matches(/^[A-Za-z\s]+$/, "Education level must only contain letters"),
        passedYear: Yup.string()
          .required("Passed year is required")
          .matches(/^[0-9]+$/, "Enter valid passed year"),
        grade: Yup.string()
          .required("Grade is required")
          .matches(/^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)%?$/, "Enter valid grade or percentage"),
      })
    )
    .min(1, "Need at least a Educational Details"),
});

export default QualificationSchema;