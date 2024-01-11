import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useDeleteHoliday } from '../../../hooks/holiday/useHoliday';
import PermissionHoc from '../../../hoc/permissionHoc';

const HolidayFields = ({ formik }) => {

  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='holidayName'
            name='holidayName'
            label='Holiday'
            placeholder='Enter holiday name'
            fullWidth
            required
            multiline
            value={formik.values.holidayName}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayName && Boolean(formik.errors.holidayName)
            }
            helperText={formik.touched.holidayName && formik.errors.holidayName}
            variant='outlined'
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='holidayDate'
            name='holidayDate'
            type='date'
            label='Date of Holiday'
            fullWidth
            required
            value={formik.values.holidayDate}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayDate && Boolean(formik.errors.holidayDate)
            }
            helperText={formik.touched.holidayDate && formik.errors.holidayDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split('T')[0], 
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='holidayDescription'
            name='holidayDescription'
            label='Description'
            placeholder='Enter holiday description'
            fullWidth
            multiline
            rows={3}
            value={formik.values.holidayDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayDescription &&
              Boolean(formik.errors.holidayDescription)
            }
            helperText={
              formik.touched.holidayDescription &&
              formik.errors.holidayDescription
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PermissionHoc(HolidayFields);
