import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useEmailConfigureForm from "../../../hooks/email/emailConfiguration/useEmailConfigureForm";
import HocButton from "../../../hoc/hocButton";
import { useGetEmailConfigure } from "../../../hooks/email/useEmail";

const EmailConfiguration = ({ permissions }) => {
  
  const { data: emailData, isLoading } = useGetEmailConfigure();
  const { formik } = useEmailConfigureForm(emailData, isLoading);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h4">Email Configuration</Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="sender"
          name="sender"
          label="Sender"
          placeholder="Enter sender name"
          fullWidth
          required
          value={formik.values.sender}
          onChange={formik.handleChange}
          error={formik.touched.sender && Boolean(formik.errors.sender)}
          helperText={formik.touched.sender && formik.errors.sender}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="host"
          name="host"
          label="Host"
          placeholder="Enter host name"
          fullWidth
          required
          value={formik.values.host}
          onChange={formik.handleChange}
          error={formik.touched.host && Boolean(formik.errors.host)}
          helperText={formik.touched.host && formik.errors.host}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="port"
          name="port"
          label="Port"
          placeholder="Enter port name"
          fullWidth
          required
          value={formik.values.port}
          onChange={formik.handleChange}
          error={formik.touched.port && Boolean(formik.errors.port)}
          helperText={formik.touched.port && formik.errors.port}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="signature"
          name="signature"
          label="Signature"
          placeholder="Enter signature name"
          fullWidth
          required
          value={formik.values.signature}
          onChange={formik.handleChange}
          error={formik.touched.signature && Boolean(formik.errors.signature)}
          helperText={formik.touched.signature && formik.errors.signature}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="password"
          name="password"
          label="Password"
          placeholder="Enter password name"
          fullWidth
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
      >
        <HocButton
          variant="contained"
          permissions={permissions?.canAdd}
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
          buttonName={"Submit"}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfiguration;
