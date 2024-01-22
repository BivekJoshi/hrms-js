import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useDeleteHoliday } from "../../../hooks/holiday/useHoliday";
import PermissionHoc from "../../../hoc/permissionHoc";
import useEditHolidayForm from "../../../hooks/holiday/HolidayForm/useEditHolidayForm";
import { ButtonComponent } from "../../Button/ButtonComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import RemarkField from "../../RemarkField/RemarkField";

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

  const isEventDateValid = new Date(formik.values.holidayDate) > new Date();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="holidayName"
            name="holidayName"
            label="Holiday"
            fullWidth
            required
            value={formik.values.holidayName}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayName && Boolean(formik.errors.holidayName)
            }
            helperText={formik.touched.holidayName && formik.errors.holidayName}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.holidayName) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="holidayDate"
            name="holidayDate"
            type="date"
            label="Date of Holiday"
            fullWidth
            required
            value={formik.values.holidayDate}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayDate && Boolean(formik.errors.holidayDate)
            }
            helperText={formik.touched.holidayDate && formik.errors.holidayDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <TextField
            id="holidayDescription"
            name="holidayDescription"
            label="Description"
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
            variant="outlined"
            InputLabelProps={{
              shrink: Boolean(formik.values.holidayDescription),
            }}
          /> */}
          <RemarkField
            id="holidayDescription"
            name="holidayDescription"
            label="Description"
            fullWidth
            formik={formik}
            data={data?.holidayDescription}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.holidayDescription),
            }}
            rows={3}
            inputProps={{ maxLength: 255 }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          gap=".5rem"
          sx={{ marginTop: "1rem" }}
        >
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            onClick={handleFormSubmit}
            disabled={!isEventDateValid}
          >
            Update Holiday
          </Button>
          <>
            {data ? (
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleDeleteHoliday}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PermissionHoc(EditHolidayFields);
