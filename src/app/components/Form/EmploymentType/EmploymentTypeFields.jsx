import { Grid, TextField, Button, MenuItem } from '@mui/material';
import React from 'react';
import useEmploymentTypeForm from '../../../hooks/employmentType/EmploymentTypeForm/useEmploymentTypeForm';

const EmploymentTypeFields = ({ onClose, isLoading, data }) => {
  const { formik } = useEmploymentTypeForm(data,onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const submitButtonText = data ? "Update" : "Add";

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
            label="Employment Type name"
            placeholder="Enter employment type"
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={
              formik.touched.name && Boolean(formik.errors.name)
            }
            helperText={
              formik.touched.name && formik.errors.name
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Enter description"
            fullWidth
            required
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description &&
              Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description && formik.errors.description
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 250 }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            {submitButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={()=>onClose()}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EmploymentTypeFields;
