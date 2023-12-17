import React from 'react';
import useTrainingForm from '../../../hooks/training/TrainingForm/useTrainingForm';
import { Button, Grid, TextField } from '@mui/material';

const TrainingField = ({ onClose, isLoading, data, empId }) => {
  const { formik } = useTrainingForm(data, empId);
  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        trainingName: true,
        trainingLevel: true,
        trainingInstitute: true,
        category: true,
        startDate: true,
        endDate: true,
      });
      onClose();
    }
  };
  const submitButtonText = data ? 'Update' : 'Add';
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='trainingName'
            name='trainingName'
            label='Training Name'
            placeholder='Enter training name'
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='trainingLevel'
            name='trainingLevel'
            label='Training level'
            placeholder='Enter training level'
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='trainingInstitute'
            name='trainingInstitute'
            label='Institude'
            placeholder='Enter training Institude'
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='category'
            name='category'
            label='Category'
            placeholder='Enter training category'
            fullWidth
            required
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='startDate'
            name='startDate'
            label='Start Date'
            placeholder='Enter training startDate'
            fullWidth
            type='date'
            required
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='endDate'
            name='endDate'
            label='End Date'
            placeholder='Enter training endDate'
            fullWidth
            type='date'
            required
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
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

export default TrainingField;
