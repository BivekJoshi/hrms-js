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
            id='companyName'
            name='companyName'
            label='Branch Name'
            placeholder='Enter branch name'
            fullWidth
            required
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='companyType'
            name='companyType'
            label='Branch Type'
            placeholder='Enter branch type'
            fullWidth
            required
            value={formik.values.companyType}
            onChange={formik.handleChange}
            error={
              formik.touched.companyType && Boolean(formik.errors.companyType)
            }
            helperText={formik.touched.companyType && formik.errors.companyType}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='companyDescription'
            name='companyDescription'
            label='Description'
            placeholder='Enter your Branch Description'
            fullWidth
            multiline
            rows={3}
            value={formik.values.companyDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.companyDescription &&
              Boolean(formik.errors.companyDescription)
            }
            helperText={
              formik.touched.companyDescription &&
              formik.errors.companyDescription
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
