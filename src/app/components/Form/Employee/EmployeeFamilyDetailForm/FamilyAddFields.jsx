import { FormLabel, Grid, Input, TextField } from '@mui/material';
import React from 'react';

const FamilyAddFields = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id={`name`}
          name={`name`}
          label='Name'
          fullWidth
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          InputLabelProps={{ shrink: Boolean(formik.values.name) }}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`relation`}
          relation={`relation`}
          label='Relation'
          fullWidth
          required
          value={formik.values.relation}
          onChange={formik.handleChange}
          error={formik.touched.relation && Boolean(formik.errors.relation)}
          helperText={formik.touched.relation && formik.errors.relation}
          InputLabelProps={{ shrink: Boolean(formik.values.relation) }}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`mobileNumber`}
          mobileNumber={`mobileNumber`}
          label='Mobile Number'
          type="number"
          fullWidth
          required
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
          }
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
          InputLabelProps={{ shrink: Boolean(formik.values.mobileNumber) }}
          variant='outlined'
          size='small'
        />
      </Grid>
    </Grid>
  );
};

export default FamilyAddFields;
