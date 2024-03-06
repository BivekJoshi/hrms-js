import * as Yup from "yup";

export const AddWorkShiftSchema = Yup.object().shape({
  scheduleName: Yup.string().required("Schedule Name is required"),
  startWeekDay: Yup.string().required("Please select start Week Day "),
  // onOffList: Yup.array()
  //   .of(Yup.string())
  //   .min(1, "Please select at least one day")
    // .test("at-least-one-true", "Please select at least one day", (value) =>
    //   value.some((val) => val === true)
    // )
    // .required("Please select at least one day"),
});

export const AssignWorkShiftSchema = Yup.object().shape({
  employeeId: Yup.string().required("Employee Name is required"),
  scheduleStartDate: Yup.string().required("Please select schedule start Day "),
});

export const UpdateWorkShiftSchema = Yup.object().shape({
  startDate: Yup.string().required("Please select start Day "),
});
