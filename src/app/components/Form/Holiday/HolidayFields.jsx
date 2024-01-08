import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useDeleteHoliday } from '../../../hooks/holiday/useHoliday';
import PermissionHoc from '../../../hoc/permissionHoc';

const HolidayFields = ({ formik }) => {
  // const [openSubmitModal, setOpenSubmitModal] = useState(false);

  // const handleSubmitModal = () => {
  //   setOpenSubmitModal(true);
  // };
  // const handleCloseModal = () => {
  //   setOpenSubmitModal();
  // };
  // const { formik } = useHolidayForm(data, handleSubmitModal, onClose);

  // const handleFormSubmit = async () => {
  //   const isValid = await formik.validateForm();

  //   if (isValid) {
  //     formik.handleSubmit();

  //     if (formik.isValid) {
  //       // onClose();
  //       // setOpenSubmitModal(false);
  //     }
  //   }
  // };

  // const deleteHolidayMutation = useDeleteHoliday({});
  // const handleDeleteHoliday = () => {
  //   deleteHolidayMutation.mutate(data.id);
  //   onClose();
  // };
  // const submitButtonText = data ? "Update" : "Add Holiday";

  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false);
  };

  // const deleteHolidayMutation = useDeleteHoliday({});
  // const handleDeleteHoliday = () => {
  //   deleteHolidayMutation.mutate(data.id);
  //   onClose();
  // };
  // const submitButtonText = data ? "Update" : "Add Holiday";

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
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='holidayDescription'
            name='holidayDescription'
            label='Description'
            placeholder='Enter your Holiday Description'
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
        {/* <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <>
            {data ? (
              <Button
                variant="contained"
                onClick={handleDeleteHoliday}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </>

          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            {submitButtonText}
          </Button>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
        </Grid> */}
      </Grid>
    </>
  );
};

export default PermissionHoc(HolidayFields);
