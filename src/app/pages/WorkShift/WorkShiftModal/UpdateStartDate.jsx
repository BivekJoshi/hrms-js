import React, { useState } from "react";
import FormModal from "../../../components/Modal/FormModal";
import { Button, Grid, TextField } from "@mui/material";
import { useUpdateWorkShiftStartDateForm } from "../../../hooks/workShift/useWorkShiftForm";

export const UpdateStartDate = ({ open, handleCloseModal, data }) => {
  const onClose = handleCloseModal;
  const { formik } = useUpdateWorkShiftStartDateForm(onClose, data);
  const [startDateSelected, setStartDateSelected] = useState(true);

  const handleFormSubmit = () => {
    if (formik.dirty === false) {
      return setStartDateSelected(false);
    } else if (formik.dirty === true) {
      formik.handleSubmit();
      if (formik.isValid) {
      }
    }
  };

  console.log(formik);
  return (
    <div>
      <FormModal
        title={"Update Start Date"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                value={formik.values.startDate}
                onChange={formik.handleChange}
                error={!startDateSelected && formik.dirty === false}
                helperText={
                  (!startDateSelected && "Please select start Day") ||
                  (formik.touched.startDate && formik.errors.startDate)
                }
                size="small"
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              gap={1}
            >
              <Button
                variant="contained"
                onClick={handleFormSubmit}
                sx={{ mt: 3, ml: 1, color: "#fff" }}
              >
                Update Start Date
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                color="error"
                sx={{ mt: 3, ml: 1, color: "#fff" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        }
      />
      <style>
        {`
        .css-o4b71y-MuiAccordionSummary-content.Mui-expanded {
          margin:0 !important;
        }
        .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded{
            min-height:20px;
        }
        .css-118m9qq-MuiButtonBase-root-MuiCheckbox-root{
            padding:5px 9px;
        }
        `}
      </style>
    </div>
  );
};
