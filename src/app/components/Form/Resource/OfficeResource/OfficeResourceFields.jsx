import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import useOfficeResourceForm from '../../../../hooks/resource/officeResource/OfficeResourceForm/useOfficeResourceForm';

const OfficeResourceFields = ({ onClose, isLoading, data }) => {
  const { formik } = useOfficeResourceForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const submitButtonText = data ? 'Update Logistics' : 'Add Logistics';

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='name'
            name='name'
            label='Resource Name'
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant='outlined'
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.name) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='uniqueNumber'
            name='uniqueNumber'
            label='Identification Key'
            fullWidth
            required
            value={formik.values.uniqueNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.uniqueNumber && Boolean(formik.errors.uniqueNumber)
            }
            helperText={
              formik.touched.uniqueNumber && formik.errors.uniqueNumber
            }
            variant='outlined'
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.uniqueNumber) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='description'
            name='description'
            label=' Description'
            fullWidth
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            variant='outlined'
            InputLabelProps={{ shrink: Boolean(formik.values.description) }}
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
            disabled={!formik?.dirty}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
            onClose={onClose}
          >
            {submitButtonText}
          </Button>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
            color='error'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default OfficeResourceFields;
