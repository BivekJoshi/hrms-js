import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import useAddHolidayForm from "../../../hooks/holiday/addHoliday/useAddHolidayForm";
import ModalComponent from "../../Modal/ModalComponent";

const AddHolidayFields = ({ onClose, isLoading }) => {
  const { formik, data } = useAddHolidayForm();

  const [showInitialView, setShowInitialView] = useState(true);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);

  const handleProceed = () => {
    setOpenSubmitModal(false);
  };

  const handleCloseEmailform = () => {
    setOpenEmail(false);
    onClose();
  };

  const handleFormSubmit = async () => {
    formik.handleSubmit();

    if (!formik.isValidating && formik.isValid) {
      setOpenSubmitModal(true);
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  //   const handleFormSubmit = async () => {
  //     const isValid = await formik.validateForm();

  //     if (isValid) {
  //       formik.handleSubmit();
  //       setOpenSubmitModal(true);
  //     } else {
  //       toast.error("Please make sure you have filled the form correctly");
  //     }
  //   };

  return (
    <>
      {showInitialView && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="holidayName"
              name="holidayName"
              label="Holiday"
              placeholder="Enter holiday name"
              fullWidth
              value={formik.values.holidayName}
              onChange={formik.handleChange}
              error={
                formik.touched.holidayName && Boolean(formik.errors.holidayName)
              }
              helperText={
                formik.touched.holidayName && formik.errors.holidayName
              }
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="holidayDate"
              name="holidayDate"
              type="date"
              required
              label="Date of Holiday"
              fullWidth
              value={formik.values.holidayDate}
              onChange={formik.handleChange}
              error={
                formik.touched.holidayDate && Boolean(formik.errors.holidayDate)
              }
              helperText={
                formik.touched.holidayDate && formik.errors.holidayDate
              }
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="holidayDescription"
              name="holidayDescription"
              label="Description"
              placeholder="Enter your Holiday Description"
              fullWidth
              value={formik.values.holidayDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.holidayDescription &&
                Boolean(formik.errors.holidayDescription)
              }
              helperText={
                formik.touched.holidayDescription &&
                formik.errors.holidayDescription
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
              Add Holiday
            </Button>
          </Grid>
        </Grid>
      )}

        <ModalComponent
          open={openSubmitModal}
          handleProceed={handleProceed}
          onClose={handleCloseEmailform}
          data={data}
        />
    </>
  );
};

export default AddHolidayFields;
