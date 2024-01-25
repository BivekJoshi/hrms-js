import * as Yup from "yup";

const EventSchema = Yup.object().shape({
  eventName: Yup.string()
    .required("Event name is required")
    .max(50, "Event name cannot be greater than 50 characters"),
  eventDate: Yup.string().required("Please select event date"),
  eventTime: Yup.string().required("Please select event time"),
  eventDescription: Yup.string()
    .required("Description is required")
    .max(255, "Description cannot be greater than 255 characters"),
  eventLocation: Yup.string()
    .required("Location is required")
    .max(50, "Location cannot be greater than 50 characters"),
});

export { EventSchema };
