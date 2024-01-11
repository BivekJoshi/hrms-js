import React from 'react';
import useTrainingForm from '../../../hooks/training/TrainingForm/useTrainingForm';
import { Button, Grid, TextField } from '@mui/material';

const TrainingField = ({ onClose, isLoading, data, empId }) => {
  const { formik } = useTrainingForm(data, empId, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      // onClose();
    }
  };
  const currentDate = new Date().toISOString().split('T')[0];

  const submitButtonText = data ? 'Update Training' : 'Add Training';
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='trainingName'
            name='trainingName'
            label='Training Name'
            fullWidth
            required
            value={formik.values.trainingName}
            onChange={formik.handleChange}
            error={
              formik.touched.trainingName && Boolean(formik.errors.trainingName)
            }
            helperText={
              formik.touched.trainingName && formik.errors.trainingName
            }
            variant='outlined'
            InputLabelProps={{ shrink: Boolean(formik.values.trainingName) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='trainingLevel'
            name='trainingLevel'
            label='Training level'
            fullWidth
            required
            value={formik.values.trainingLevel}
            onChange={formik.handleChange}
            error={
              formik.touched.trainingLevel &&
              Boolean(formik.errors.trainingLevel)
            }
            helperText={
              formik.touched.trainingLevel && formik.errors.trainingLevel
            }
            variant='outlined'
            InputLabelProps={{ shrink: Boolean(formik.values.trainingLevel) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='trainingInstitute'
            name='trainingInstitute'
            label='Institute'
            fullWidth
            required
            value={formik.values.trainingInstitute}
            onChange={formik.handleChange}
            error={
              formik.touched.trainingInstitute &&
              Boolean(formik.errors.trainingInstitute)
            }
            helperText={
              formik.touched.trainingInstitute &&
              formik.errors.trainingInstitute
            }
            variant='outlined'
            InputLabelProps={{
              shrink: Boolean(formik.values.trainingInstitute),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='category'
            name='category'
            label='Category'
            fullWidth
            required
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            variant='outlined'
            InputLabelProps={{ shrink: Boolean(formik.values.category) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='startDate'
            name='startDate'
            label='Start Date'
            fullWidth
            type='date'
            required
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: currentDate,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='endDate'
            name='endDate'
            label='End Date'
            fullWidth
            type='date'
            disabled={!formik?.values?.startDate}
            required
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: formik?.values?.startDate, // Disable past date selections
              max: currentDate, // Disable past date selections
            }}
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

export default TrainingField;
