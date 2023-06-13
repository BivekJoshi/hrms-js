import { Grid, TextField } from '@mui/material';
import React from 'react';

const EmployeeEducationDetailForm = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TextField
          id='board'
          name='board'
          label='Board'
          placeholder='Enter your board'
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeEducationDetailForm;
