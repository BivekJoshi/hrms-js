import * as Yup from "yup";

const QualificationSchema = Yup.object().shape({
  education: Yup.array()
    .of(
      Yup.object().shape({
        board: Yup.string()
          .required("Board Name is required")
          .max(50, "Board Name cannot be greater than 50 characters")
          .matches(/^[A-Za-z\s]+$/, "Board must only contain letters"),
        institute: Yup.string()
          .required("Institute Name is required")
          .max(50, "Institute Name cannot be greater than 50 characters")
          .matches(/^[A-Za-z\s]+$/, "Institute Name must only contain letters"),
        passedLevel: Yup.string().required("Passed Level is required"), // .matches(
        //   /^[A-Za-z\s]+$/,
        //   'Education level must only contain letters'
        // ),
        passedYear: Yup.string()
          ?.nullable()
          .required("Passed Year is required"),
        grade: Yup.string()
          .required("Grade is required")
          // .max(25, "Grade cannot be greater than 25 characters")
          .matches(
            /^(100(\.0{1,2})?%?|\d{0,2}(\.\d{1,2})?%?$|^[A-Ea-e](?:[+-])?)(?:\s?[A-Za-z+-])?$/,
            "Enter valid grade, percentage not greater than 100, or a letter grade (A to E) with optional + or - "
          ),
      })
    )
    .min(1, "Need at least a Educational Details"),
});

export default QualificationSchema;
