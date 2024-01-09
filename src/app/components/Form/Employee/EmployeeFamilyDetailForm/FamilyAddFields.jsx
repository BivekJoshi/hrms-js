import { Grid } from '@mui/material';
import React from 'react';
import { Grid } from '@mui/material';

const FamilyAddFields = ({ formik, onClose }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id={`name`}
          name={`name`}
          label='Name'
          placeholder='Enter Name'
          fullWidth
          // required
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`relation`}
          relation={`relation`}
          label='relation'
          placeholder='Enter relation'
          fullWidth
          // required
          value={formik.values.relation}
          onChange={formik.handleChange}
          error={formik.touched.relation && Boolean(formik.errors.relation)}
          helperText={formik.touched.relation && formik.errors.relation}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={`mobileNumber`}
          mobileNumber={`mobileNumber`}
          label='mobileNumber'
          placeholder='Enter mobileNumber'
          fullWidth
          // required
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
          }
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='flex-end'
      >
        <Button
          variant='contained'
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
        >
          Add
        </Button>
        <Button
          variant='contained'
          onClick={onClose}
          sx={{ mt: 3, ml: 1 }}
          color='error'
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default FamilyAddFields;
