import React, { useState } from 'react';
import { Grid, TextField, Button, Modal, Box } from '@mui/material';
import useEventForm from '../../../hooks/event/EventForm/useEventForm';

const AddEventFields = ({ formik }) => {
  // const { formik, data } = useEventForm();

  // const handleProceed = () => {
  //   setOpenSubmitModal(false);
  // };

  // const handleCloseEmailform = () => {
  //   setOpenEmail(false);
  //   onClose();
  // };

  // const handleFormSubmit = async () => {
  //   formik.handleSubmit();

  //   if (!formik.isValidating && formik.isValid) {
  //     setOpenSubmitModal(true);
  //     // onClose();
  //   }
  // };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='eventName'
            name='eventName'
            label='Event'
            placeholder='Enter event name'
            fullWidth
            multiline
            value={formik.values.eventName}
            onChange={formik.handleChange}
            error={formik.touched.eventName && Boolean(formik.errors.eventName)}
            helperText={formik.touched.eventName && formik.errors.eventName}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id='eventDate'
            name='eventDate'
            type='date'
            required
            label='Date of Event'
            fullWidth
            value={formik.values.eventDate}
            onChange={formik.handleChange}
            error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
            helperText={formik.touched.eventDate && formik.errors.eventDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id='eventTime'
            name='eventTime'
            type='time'
            required
            label='Time of Event'
            fullWidth
            value={formik.values.eventTime}
            onChange={formik.handleChange}
            error={formik.touched.eventTime && Boolean(formik.errors.eventTime)}
            helperText={formik.touched.eventTime && formik.errors.eventTime}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='eventLocation'
            name='eventLocation'
            label='Event Location'
            placeholder='Enter your Event Location'
            fullWidth
            multiline
            value={formik.values.eventLocation}
            onChange={formik.handleChange}
            error={
              formik.touched.eventLocation &&
              Boolean(formik.errors.eventLocation)
            }
            helperText={
              formik.touched.eventLocation && formik.errors.eventLocation
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='eventDescription'
            name='eventDescription'
            label='Description'
            placeholder='Enter your Event Description'
            fullWidth
            multiline
            value={formik.values.eventDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.eventDescription &&
              Boolean(formik.errors.eventDescription)
            }
            helperText={
              formik.touched.eventDescription && formik.errors.eventDescription
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddEventFields;
