import * as Yup from "yup";

export const AddWorkShiftSchema = Yup.object().shape({
  scheduleName: Yup.string().required("Schedule Name is required"),
  startWeekDay: Yup.string().required("Please select start Week Day "),
  onOffList: Yup.array()
    .of(
      Yup.object().shape({
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("End time is required"),
        // startLateTime: Yup.string().required("Start late time is required"),
        // endEarlyTime: Yup.string().required("End early time is required"),
      })
    )
    .required("Please select at least one day"),
});

export const AssignWorkShiftSchema = Yup.object().shape({
  employeeId: Yup.string().required("Employee Name is required"),
  scheduleStartDate: Yup.string().required("Please select schedule start Day "),
});

export const UpdateWorkShiftSchema = Yup.object().shape({
  startDate: Yup.string().required("Please select start Day "),
});
