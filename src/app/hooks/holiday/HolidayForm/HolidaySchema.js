import * as Yup from "yup";

const HolidaySchema = Yup.object().shape({
  holidayName: Yup.string().required("Please enter holiday "),
  holidayDate: Yup.string().required("Please select date for holiday"),
});

export { HolidaySchema };
