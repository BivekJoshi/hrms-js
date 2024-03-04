import * as Yup from "yup";

const WorkShiftSchema = Yup.object().shape({
  scheduleName: Yup.string().required("Schedule Name is required"),
  startWeekDay: Yup.string().required("Please select start Week Day "),
  onOffList: Yup.array()
    .of(Yup.boolean())
    .min(1, "Please select at least one day")
    .test("at-least-one-true", "Please select at least one day", (value) =>
      value.some((val) => val === true)
    )
    .required("Please select at least one day"),
});

export { WorkShiftSchema };
