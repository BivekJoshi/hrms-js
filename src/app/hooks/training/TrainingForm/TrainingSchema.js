import * as Yup from "yup";

const TrainingSchema = Yup.object().shape({
  trainingName: Yup.string().required("Training name is required"),
  trainingLevel: Yup.string().required("Training level is required"),
  trainingInstitute: Yup.string().required("Training institute is required"),
  category: Yup.string().required("Category is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .test(
      "End date should be greater than start date",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),
});

export { TrainingSchema };
