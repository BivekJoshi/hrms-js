import * as Yup from "yup";

const HolidaySchema = Yup.object().shape({
  holidayName: Yup.string().required("Please Enter Holiday "),
  holidayDate: Yup.string().required("Please Select Date for Holiday"),
});

export { HolidaySchema };
