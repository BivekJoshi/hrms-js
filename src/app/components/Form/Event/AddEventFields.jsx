import React, { useState } from "react";
import { Grid, TextField, Button, Modal, Box } from "@mui/material";
import { toast } from "react-toastify";
import useAddEventForm from "../../../hooks/event/addEvent/useAddEventForm";
import EmailToAll from "../../../pages/Email/EmailTOAll";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #808080",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddEventFields = ({ onClose, isLoading }) => {
  const { formik } = useAddEventForm();
  const [openEmail, setOpenEmail] = useState(false);
  const { data: employeeData } = useGetEmployee();
  const [openSubmitModal, setOpenSubmitModal] = useState(false);

  const handleOpenSubmitModal = () => {
    setOpenSubmitModal(true);
  };

  const handleOpenEmailform = () => {
    setOpenEmail(true);
    setOpenSubmitModal(true);
  };

  const handleCloseEmailform = () => {
    setOpenEmail(false);
  };

  const handleFormSubmit = async () => {
    formik.handleSubmit();

    if (formik.isValid) {
      handleOpenSubmitModal();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="eventName"
            name="eventName"
            label="Event"
            placeholder="Enter event name"
            fullWidth
            value={formik.values.eventName}
            onChange={formik.handleChange}
            error={formik.touched.eventName && Boolean(formik.errors.eventName)}
            helperText={formik.touched.eventName && formik.errors.eventName}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="eventDescription"
            name="eventDescription"
            label="Description"
            placeholder="Enter your Event Description"
            fullWidth
            value={formik.values.eventDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.eventDescription &&
              Boolean(formik.errors.eventDescription)
            }
            helperText={
              formik.touched.eventDescription && formik.errors.eventDescription
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="eventLocation"
            name="eventLocation"
            label="Event Location"
            placeholder="Enter your Event Location"
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Add Event
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={openSubmitModal}
        onClose={() => setOpenSubmitModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <h3>Do you like to Email this event to Employee</h3>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleOpenEmailform}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenSubmitModal(false);
                }}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                No
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
      {openSubmitModal && openEmail && (
        <EmailToAll
          employeeData={employeeData}
          employeeid={employeeData.id}
          open={openEmail}
          onClose={handleCloseEmailform}
          handleOpenEmailform={handleOpenEmailform}
        />
      )}
    </>
  );
};

export default AddEventFields;
