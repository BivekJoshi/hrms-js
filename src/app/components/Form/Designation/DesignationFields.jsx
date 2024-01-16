import { Grid, TextField, Button, MenuItem } from '@mui/material';
import React from 'react';
import useDesignationForm from '../../../hooks/designation/DesignationForm/useDesignationForm';
import RemarkField from '../../RemarkField/RemarkField';

const DesignationFields = ({ onClose, isLoading, data }) => {
  const { formik } = useDesignationForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const submitButtonText = data ? 'Update Designation' : 'Add Designation';

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='positionName'
            name='positionName'
            label='Designation Name'
            fullWidth
            required
            value={formik.values.positionName}
            onChange={formik.handleChange}
            error={
              formik.touched.positionName && Boolean(formik.errors.positionName)
            }
            helperText={
              formik.touched.positionName && formik.errors.positionName
            }
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: Boolean(formik.values.positionName) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='positionLevel'
            name='positionLevel'
            label='Designation Level'
            fullWidth
            required
            value={formik.values.positionLevel}
            onChange={formik.handleChange}
            error={
              formik.touched.positionLevel &&
              Boolean(formik.errors.positionLevel)
            }
            helperText={
              formik.touched.positionLevel && formik.errors.positionLevel
            }
            variant='outlined'
            size='small'
            InputLabelProps={{ shrink: Boolean(formik.values.positionLevel) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {data ? (
            <TextField
              id='salary'
              name='salary'
              label='Salary'
              fullWidth
              required
              type='number'
              value={formik.values.salary || 0}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
              variant='outlined'
              size='small'
              InputLabelProps={{ shrin: true }}
            />
          ) : (
            <TextField
              id='salary'
              name='salary'
              label='Salary'
              fullWidth
              required
              type='number'
              value={formik.values.salary}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
              variant='outlined'
              size='small'
              InputLabelProps={{ shrink: Boolean(formik.values.salary) }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <TextField
            id="positionDetails"
            name="positionDetails"
            label="Designation Details"
            fullWidth
            multiline
            rows={4}
            value={formik.values.positionDetails}
            onChange={formik.handleChange}
            error={
              formik.touched.positionDetails &&
              Boolean(formik.errors.positionDetails)
            }
            helperText={
              formik.touched.positionDetails && formik.errors.positionDetails
            }
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.positionDetails) }}
            inputProps={{ maxLength: 250 }}
          /> */}
          <RemarkField
            id='positionDetails'
            name='positionDetails'
            label='Designation Details'
            fullWidth
            formik={formik}
            maxLength={255}
            variant='outlined'
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.positionDetails),
            }}
            rows={4}
            inputProps={{ maxLength: 255 }}
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
            disabled={!formik?.dirty}
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
          >
            {submitButtonText}
          </Button>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
            color='error'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default DesignationFields;
