import { Grid, Typography } from "@mui/material";
import React from "react";
import { ButtonComponent } from "../../Button/ButtonComponent";

const EditEmpHolidayFields = ({ onClose, data }) => {
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} lg={6} xl={6}>
        <Typography variant='h6'>Holiday Name:</Typography>
        <Typography variant='p'>{data?.holidayName}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={6} xl={6}>
        <Typography variant='h6'>Date:</Typography>
        <Typography variant='p'>{data?.holidayDate}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Typography variant='h6'>Description:</Typography>
        <Typography variant='p'>{data?.holidayDescription}</Typography>
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

export default EditEmpHolidayFields;
