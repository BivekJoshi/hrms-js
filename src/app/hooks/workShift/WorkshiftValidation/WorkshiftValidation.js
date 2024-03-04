import * as Yup from "yup";

const WorkShiftSchema = Yup.object().shape({
  scheduleName: Yup.string().required("Schedule Name is required"),
  startWeekDay: Yup.string().required("Please select start Week Day "),
  onOffList: Yup.array()
    .of(Yup.boolean())
    .min(1, "Please select at least one day")
    .required("Please select at least one day"),
});

export { WorkShiftSchema };
