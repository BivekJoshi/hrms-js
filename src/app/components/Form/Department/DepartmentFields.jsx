import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useDepartmentForm from '../../../hooks/department/DepartmentForm/useDepartmentForm';

const DepartmentFields = ({ onClose, isLoading, data }) => {
  const { formik } = useDepartmentForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    onClose();
  };
  const submitButtonText = data ? 'Update Department' : 'Add Department';
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='departmentName'
            name='departmentName'
            label='Department Name'
            placeholder='Enter department name'
            fullWidth
            required
            value={formik.values.departmentName}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentName &&
              Boolean(formik.errors.departmentName)
            }
            helperText={
              formik.touched.departmentName && formik.errors.departmentName
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='departmentType'
            name='departmentType'
            label='Department Type'
            placeholder='Enter department type'
            fullWidth
            required
            value={formik.values.departmentType}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentType &&
              Boolean(formik.errors.departmentType)
            }
            helperText={
              formik.touched.departmentType && formik.errors.departmentType
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='departmentDescription'
            name='departmentDescription'
            label='Description'
            placeholder='Enter department description'
            fullWidth
            multiline
            rows={3}
            value={formik.values.departmentDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentDescription &&
              Boolean(formik.errors.departmentDescription)
            }
            helperText={
              formik.touched.departmentDescription &&
              formik.errors.departmentDescription
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
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

export default DepartmentFields;
