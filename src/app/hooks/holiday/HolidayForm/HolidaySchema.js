import * as Yup from "yup";

const HolidaySchema = Yup.object().shape({
  holidayName: Yup.string().required("Please enter holiday ").max(50, 'Holiday name cannot be greater than 50 characters'),
  holidayDescription: Yup.string().max(255, "Holiday description cannot be greater than 255 characters"),
  holidayDate: Yup.string().required("Please select date for holiday").test(
    "Holiday date cannot be in the past",
    (value) => !value || new Date(value) >= new Date()
  ),
});

export { HolidaySchema };
