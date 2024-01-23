import * as Yup from "yup";

const HolidaySchema = Yup.object().shape({
  holidayName: Yup.string().required("Holiday is required").max(50, 'Holiday cannot be greater than 50 characters'),
  holidayDescription: Yup.string().max(255, "Description cannot be greater than 255 characters"),
  holidayDate: Yup.string().required("Please select date for holiday"),
});

export { HolidaySchema };
