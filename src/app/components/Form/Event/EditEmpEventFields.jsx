import { Grid, Typography } from "@mui/material";
import React from "react";
import { ButtonComponent } from "../../Button/ButtonComponent";

const EditEmpEventFields = ({ onClose, data }) => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} lg={6} xl={6}>
        <Typography variant='h6'>Event Name:</Typography>
        <Typography variant='p'>{data?.eventName}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={6} xl={6}>
        <Typography variant='h6'>Date:</Typography>
        <Typography variant='p'>{data?.eventDate}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={6} xl={6}>
        <Typography variant='h6'>Time:</Typography>
        <Typography variant='p'>{data?.eventTime}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={6} xl={6}>
        <Typography variant='h6'>Location:</Typography>
        <Typography variant='p'>{data?.eventLocation}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Typography variant='h6'>Description:</Typography>
        <Typography variant='p'>{data?.eventDescription}</Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <ButtonComponent
          variant="contained"
          OnClick={onClose}
          BGColor={"#d32f2f"}
          buttonName={"Cancel"}
        />
      </Grid>
    </Grid>
  );
};

export default EditEmpEventFields;