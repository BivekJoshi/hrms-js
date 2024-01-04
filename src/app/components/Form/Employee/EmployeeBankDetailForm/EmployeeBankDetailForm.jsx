import { Grid, TextField } from '@mui/material';
import React from 'react';

const EmployeeBankDetailForm = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id='bankName'
          name='bankName'
          label='Bank Name'
          placeholder='Enter bank name'
          fullWidth
          value={formik.values.bankName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          helperText={formik.touched.bankName && formik.errors.bankName}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id='bankBranch'
          name='bankBranch'
          label='Bank Branch'
          placeholder='Enter bank branch'
          fullWidth
          value={formik.values.bankBranch}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankBranch && Boolean(formik.errors.bankBranch)}
          helperText={formik.touched.bankBranch && formik.errors.bankBranch}
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id='bankAccountNumber'
          name='bankAccountNumber'
          label='Bank Account Number'
          placeholder='Enter bank account number'
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
          variant='outlined'
          size='small'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id='bankAddress'
          name='bankAddress'
          label='Bank Address'
          placeholder='Enter bank address'
          fullWidth
          value={formik.values.bankAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bankAddress && Boolean(formik.errors.bankAddress)
          }
          helperText={formik.touched.bankAddress && formik.errors.bankAddress}
          variant='outlined'
          size='small'
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeBankDetailForm;
