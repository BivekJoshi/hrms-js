import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useDeleteEvent } from "../../../hooks/event/useEvent";
import useEditEventForm from "../../../hooks/event/editEvent/useEditEventForm";
import PermissionHoc from "../../../hoc/permissionHoc";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import RemarkField from "../../RemarkField/RemarkField";

const EditEventFields = ({
  onClose,
  isLoading,
  data,
  permissions,
  hideDelete,
}) => {
  const { formik } = useEditEventForm(data, onClose);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const { deleteEventMutation, isSuccess: isDeleteSuccess } = useDeleteEvent(
    {}
  );
  useEffect(() => {
    if (isDeleteSuccess) {
      onClose();
    }
  }, [isDeleteSuccess]);
  const handleDeleteEvent = () => {
    deleteEventMutation(data.id);
  };
  // const isEventDateValid = new Date(formik.values.eventDate) >= new Date().toISOString().split("T")[0];

  // const isEventDateValid =
  //   new Date(formik.values.eventDate) >= new Date() ||
  //   formik.values.eventDate === new Date().toISOString().split("T")[0];

  const isEventDateValid =
    formik.values.eventDate >= new Date().toISOString().split("T")[0];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="eventName"
            name="eventName"
            label="Event"
            fullWidth
            value={formik.values.eventName}
            onChange={formik.handleChange}
            error={formik.touched.eventName && Boolean(formik.errors.eventName)}
            helperText={formik.touched.eventName && formik.errors.eventName}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.eventName) }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="eventDate"
            name="eventDate"
            type="date"
            required
            label="Date of Event"
            fullWidth
            value={formik.values.eventDate}
            onChange={formik.handleChange}
            error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
            helperText={formik.touched.eventDate && formik.errors.eventDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            size="small"
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="eventTime"
            name="eventTime"
            type="time"
            required
            label="Time of Event"
            fullWidth
            value={formik.values.eventTime}
            onChange={formik.handleChange}
            error={formik.touched.eventTime && Boolean(formik.errors.eventTime)}
            helperText={formik.touched.eventTime && formik.errors.eventTime}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="eventLocation"
            name="eventLocation"
            label="Event Location"
            fullWidth
            value={formik.values.eventLocation}
            onChange={formik.handleChange}
            error={
              formik.touched.eventLocation &&
              Boolean(formik.errors.eventLocation)
            }
            helperText={
              formik.touched.eventLocation && formik.errors.eventLocation
            }
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.eventLocation) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <RemarkField
            id="eventDescription"
            name="eventDescription"
            label="Description"
            fullWidth
            formik={formik}
            data={data?.eventDescription}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.eventDescription),
            }}
            rows={4}
            inputProps={{ maxLength: 255 }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          gap=".5rem"
          sx={{ marginTop: "1rem" }}
        >
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            onClick={handleFormSubmit}
            disabled={!isEventDateValid}
          >
            Update Event
          </Button>
          {!hideDelete && (
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={handleDeleteEvent}
            >
              Delete
            </Button>
          )}
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default PermissionHoc(EditEventFields);
