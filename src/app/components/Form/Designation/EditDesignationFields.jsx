import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useEditDesignationForm from '../../../hooks/designation/editDesignation/useEditDesignationForm';

const EditDesignationFields = ({ onClose, isLoading,data }) => {
  const { formik } = useEditDesignationForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        positionName: true,
        positionLevel: true,
        salary: true,
        positionDetails:true,
      });
      onClose();
    } else {
      toast.error('Please make sure you have filled the form correctly');
    }
  };

  return (
    !isLoading && (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
          id='positionName'
          name='positionName'
          label='Position Name'
          placeholder='Enter position name'
          fullWidth
          value={formik.values.positionName}
          onChange={formik.handleChange}
          error={formik.touched.positionName && Boolean(formik.errors.positionName)}
          helperText={formik.touched.positionName && formik.errors.positionName}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='positionLevel'
          name='positionLevel'
          label='Position Level'
          placeholder='Enter position level'
          fullWidth
          value={formik.values.positionLevel}
          onChange={formik.handleChange}
          error={formik.touched.positionLevel && Boolean(formik.errors.positionLevel)}
          helperText={formik.touched.positionLevel && formik.errors.positionLevel}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='salary'
          name='salary'
          label='Salary'
          placeholder='Enter salary'
          fullWidth
          value={formik.values.salary}
          onChange={formik.handleChange}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='positionDetails'
          name='positionDetails'
          label='Position Details'
          placeholder='Enter position details'
          fullWidth
          value={formik.values.positionDetails}
          onChange={formik.handleChange}
          error={formik.touched.positionDetails && Boolean(formik.errors.positionDetails)}
          helperText={formik.touched.positionDetails && formik.errors.positionDetails}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='flex-end'
      >
        <Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
        >
          Update Designation
        </Button>
      </Grid>
    </Grid>
    )
  );
};

export default EditDesignationFields;
