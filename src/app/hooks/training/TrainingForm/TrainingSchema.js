import * as Yup from "yup";

const TrainingSchema = Yup.object().shape({
  trainingName: Yup.string().required("Please enter training"),
  trainingLevel: Yup.string().required("Please enter your training level"),
  trainingInstitute: Yup.string().required("Please enter the institude"),
  category: Yup.string().required("Category is Required"),
  startDate: Yup.string().required("Please select the start date"),
  endDate: Yup.date()
    .required("Please select the end date")
    .test(
      "end-date-greater",
      "End date should be greater than start date",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),
});

export { TrainingSchema };
