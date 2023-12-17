import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import useCompanyForm from '../../../hooks/company/CompanyForm/useCompanyForm';

const CompanyFields = ({ onClose, isLoading, data }) => {
  const { formik } = useCompanyForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const submitButtonText = data ? 'Update Branch' : 'Add Branch';
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='branchName'
            name='branchName'
            label='Branch Name'
            placeholder='Enter branch name'
            fullWidth
            required
            value={formik.values.branchName}
            onChange={formik.handleChange}
            error={
              formik.touched.branchName && Boolean(formik.errors.branchName)
            }
            helperText={formik.touched.branchName && formik.errors.branchName}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='branchAddress'
            name='branchAddress'
            label='Address'
            placeholder='Enter branch address'
            fullWidth
            required
            value={formik.values.branchAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.branchAddress && Boolean(formik.errors.branchAddress)
            }
            helperText={formik.touched.branchAddress && formik.errors.branchAddress}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='branchContact'
            name='branchContact'
            label='Contact'
            placeholder='Enter branch contact'
            fullWidth
            required
            value={formik.values.branchContact}
            onChange={formik.handleChange}
            error={
              formik.touched.branchContact && Boolean(formik.errors.branchContact)
            }
            helperText={formik.touched.branchContact && formik.errors.branchContact}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='branchEmail'
            name='branchEmail'
            label='Email'
            placeholder='Enter branch email'
            fullWidth
            required
            value={formik.values.branchEmail}
            onChange={formik.handleChange}
            error={
              formik.touched.branchEmail && Boolean(formik.errors.branchEmail)
            }
            helperText={formik.touched.branchEmail && formik.errors.branchEmail}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='branchDescription'
            name='branchDescription'
            label='Description'
            placeholder='Enter your Branch Description'
            fullWidth
            multiline
            rows={3}
            value={formik.values.branchDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.branchDescription &&
              Boolean(formik.errors.branchDescription)
            }
            helperText={
              formik.touched.branchDescription &&
              formik.errors.branchDescription
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 250 }}
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
            {submitButtonText}
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
    )
  );
};

export default CompanyFields;
