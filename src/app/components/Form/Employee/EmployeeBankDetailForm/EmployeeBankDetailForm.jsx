import { Grid, TextField } from '@mui/material';
import React from 'react';

const EmployeeBankDetailForm = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id='bankName'
          name='bankName'
          label='Bank Name'
          fullWidth
          value={formik.values.bankName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          helperText={formik.touched.bankName && formik.errors.bankName}
          InputLabelProps={{ shrink: Boolean(formik.values.bankName) }}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id='bankBranch'
          name='bankBranch'
          label='Bank Branch'
          fullWidth
          value={formik.values.bankBranch}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankBranch && Boolean(formik.errors.bankBranch)}
          helperText={formik.touched.bankBranch && formik.errors.bankBranch}
          InputLabelProps={{ shrink: Boolean(formik.values.bankBranch) }}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id='bankAccountNumber'
          name='bankAccountNumber'
          label='Bank Account Number'
          fullWidth
          value={formik.values.bankAccountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bankAccountNumber &&
            Boolean(formik.errors.bankAccountNumber)
          }
          helperText={
            formik.touched.bankAccountNumber && formik.errors.bankAccountNumber
          }
          InputLabelProps={{ shrink: Boolean(formik.values.bankAccountNumber) }}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id='bankAddress'
          name='bankAddress'
          label='Bank Address'
          fullWidth
          multiline
          value={formik.values.bankAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bankAddress && Boolean(formik.errors.bankAddress)
          }
          helperText={formik.touched.bankAddress && formik.errors.bankAddress}
          InputLabelProps={{ shrink: Boolean(formik.values.bankAddress) }}
          variant='outlined'
          size='small'
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeBankDetailForm;
