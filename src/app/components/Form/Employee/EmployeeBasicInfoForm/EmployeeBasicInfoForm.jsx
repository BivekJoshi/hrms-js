import { Grid, TextField } from '@mui/material';
import React from 'react';

const EmployeeBasicInfoForm = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          id='firstName'
          name='firstName'
          label='First Name'
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          variant='standard'
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeBasicInfoForm;
