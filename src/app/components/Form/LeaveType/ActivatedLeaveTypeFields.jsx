import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useActivateLeaveTypeForm, useDeactivateLeaveTypeForm } from './useDeleteLeaveTypeForm';

export const ActivatedLeaveTypeFields = ({ onClose, isLoading, data }) => {
    const {formik }=  useActivateLeaveTypeForm(data, onClose);
  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
    //   onClose();
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={2}>
        <Typography style={{ padding: "1rem" }} variant="p">
          Are you sure you want activate this leave type
        </Typography>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Yes Proceed
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            No
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export const DeactivatedLeaveTypeFields = ({ onClose, isLoading, data }) => {
  const {formik }=  useDeactivateLeaveTypeForm(data, onClose);
const handleFormSubmit = () => {
  formik.handleSubmit();

  if (formik.isValid) {
  //   onClose();
  }
};

return (
  !isLoading && (
    <Grid container spacing={2}>
      <Typography style={{ padding: "1rem" }} variant="p">
        Are you sure you want deactivate this leave type
      </Typography>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
        >
          Yes Proceed
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ mt: 3, ml: 1 }}
          color="error"
        >
          No
        </Button>
      </Grid>
    </Grid>
  )
);
};
