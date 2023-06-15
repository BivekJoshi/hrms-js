import * as Yup from 'yup';

const QualificationSchema = Yup.object().shape({
  education: Yup.array()
  .of(
      Yup.object().shape({
        board: Yup.string().required("Board name is required"),
        institute: Yup.string().required("Institude is reduied"),
        passedLevel: Yup.string().required("Enter Pass Level Please"),
        passedYear: Yup.string().required("Please Enter Passed Year"),
        grade: Yup.string().required("Grade is required"),
      })
  )
  .min(1, "Need at least a family")
});

export { QualificationSchema };
