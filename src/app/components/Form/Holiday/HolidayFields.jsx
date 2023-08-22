import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDeleteHoliday } from "../../../hooks/holiday/useHoliday";
import useHolidayForm from "../../../hooks/holiday/HolidayForm/useHolidayForm";
import ModalComponent from "../../Modal/ModalComponent";
import useAuth from "../../../../auth/hooks/component/login/useAuth";

const HolidayFields = ({ onClose, isLoading, data }) => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee } = useAuth();
  const [openSubmitModal, setOpenSubmitModal] = useState(false);

  const handleSubmitModal = () => {
    setOpenSubmitModal(true);
  };
  const handleCloseModal = () => {
    setOpenSubmitModal();
  };
  const { formik } = useHolidayForm(data, handleSubmitModal, onClose);

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();

    if (isValid) {
      formik.handleSubmit();

      if (formik.isValid) {
        // onClose();
        // setOpenSubmitModal(false);
      } else {
        toast.error("Please make sure you have filled the form correctly");
      }
    }
  };

  const deleteHolidayMutation = useDeleteHoliday({});
  const handleDeleteHoliday = () => {
    deleteHolidayMutation.mutate(data.id);
    onClose();
  };
  const submitButtonText = data ? "Update" : "Add Holiday";

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="holidayName"
            name="holidayName"
            label="Holiday"
            placeholder="Enter holiday name"
            fullWidth
            required
            value={formik.values.holidayName}
            onChange={formik.handleChange}
            error={
              formik.touched.holidayName && Boolean(formik.errors.holidayName)
            }
            helperText={formik.touched.holidayName && formik.errors.holidayName}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="holidayDescription"
            name="holidayDescription"
            label="Description"
            placeholder="Enter your Holiday Description"
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {/* {(isSuperAdmin || isAdmin || isHr) && ( */}
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
          {/* )} */}

          {/* {(isSuperAdmin || isAdmin || isHr) && ( */}
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              {submitButtonText}
            </Button>
          {/* )} */}
          {/* {(isSuperAdmin || isAdmin || isHr) && ( */}
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ mt: 3, ml: 1 }}
              color="error"
            >
              Cancel
            </Button>
          {/* )} */}
        </Grid>
      </Grid>
      {openSubmitModal && (
        <ModalComponent
          open={openSubmitModal}
          handleSubmitModal={handleSubmitModal}
          data={data}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default HolidayFields;
