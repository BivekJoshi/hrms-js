import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useDeleteHoliday } from "../../../hooks/holiday/useHoliday";
import PermissionHoc from "../../../hoc/permissionHoc";
import useEditHolidayForm from "../../../hooks/holiday/HolidayForm/useEditHolidayForm";
import { ButtonComponent } from "../../Button/ButtonComponent";

const EditHolidayFields = ({ onClose, isLoading, data, permissions }) => {
  const { formik } = useEditHolidayForm(data);

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();

    if (isValid) {
      formik.handleSubmit();

      if (formik.isValid) {
        onClose();
        // setOpenSubmitModal(false);
      }
    }
  };

  const deleteHolidayMutation = useDeleteHoliday({});
  const handleDeleteHoliday = () => {
    deleteHolidayMutation.mutate(data.id);
    onClose();
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
            value={formik.values.holidayName}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayName && Boolean(formik.errors.holidayName)
            }
            helperText={formik.touched.holidayName && formik.errors.holidayName}
            variant='outlined'
            size="small"
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
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <ButtonComponent
            variant="contained"
            OnClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
            buttonName={"Update"}
          />
          <>
            {data ? (
              <ButtonComponent
                variant="contained"
                OnClick={handleDeleteHoliday}
                sx={{ mt: 3, ml: 1 }}
                BGColor={"#d32f2f"}
                buttonName={"Delete"}
              />
            ) : (
              ''
            )}
          </>

          <ButtonComponent
            variant="contained"
            OnClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            BGColor={"#d32f2f"}
            buttonName={"Cancel"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PermissionHoc(EditHolidayFields);
