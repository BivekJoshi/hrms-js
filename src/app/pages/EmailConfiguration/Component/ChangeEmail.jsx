import { LoadingButton } from "@mui/lab";
import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useChangeForm from "../../../hooks/email/changeEmail/useChangeForm";
import { toast } from "react-toastify";

const ChangeEmail = () => {
  const { formik } = useChangeForm({});

  const handleFormSubmit = async () => {
    formik.handleSubmit();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h4">Change Email </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="newEmail"
          name="newEmail"
          label="New Email"
          placeholder="Enter New Email"
          fullWidth
          required
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
          helperText={formik.touched.newEmail && formik.errors.newEmail}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="confirmEmail"
          name="confirmEmail"
          label="Confirm Email"
          placeholder="Enter Conform Email"
          fullWidth
          required
          value={formik.values.confirmEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)
          }
          helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        marginTop="1rem"
      >
        <LoadingButton
          width="10rem"
          onClick={handleFormSubmit}
          variant="contained"
          //   loading={loading}
          className="login-btn"
        >
          Change Email
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default ChangeEmail;
