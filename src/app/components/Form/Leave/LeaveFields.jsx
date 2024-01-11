import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLeaveEditForm } from "../../../hooks/leave/LeaveForm/useLeaveForm";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import useAuth from "../../../../auth/hooks/component/login/useAuth";

const leaveStatus = [
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

export const EditLeaveFields = ({ onClose, isLoading, data }) => {
  const { isManager, isSuperAdmin } = useAuth();

  const { formik, success } = useLeaveEditForm(data, onClose);
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const submitButtonText = data ? "Update Leave" : "Add Leave";

  if (isManager || isSuperAdmin) {
    return (
      !isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="p">
              {data?.employeeName} wants to take a {data?.leaveType} Leave From
              Date {data?.fromDate} To Date {data?.toDate}.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="leaveStatus"
              name="leaveStatus"
              select
              label="Leave Status"
              fullWidth
              required
              value={formik.values.leaveStatus}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveStatus && Boolean(formik.errors.leaveStatus)
              }
              helperText={
                formik.touched.leaveStatus && formik.errors.leaveStatus
              }
              InputLabelProps={{ shrink: Boolean(formik.values.leaveStatus) }}
              size="small"
            >
              {leaveStatus.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="leaveRemarks"
              name="leaveRemarks"
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={formik.values.leaveRemarks}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveRemarks &&
                Boolean(formik.errors.leaveRemarks)
              }
              helperText={
                formik.touched.leaveRemarks && formik.errors.leaveRemarks
              }
              variant="outlined"
              InputLabelProps={{ shrink: Boolean(formik.values.leaveRemarks) }}
              inputProps={{ maxLength: 250 }}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              sx={{ mt: 3, ml: 1, color: "#fff" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ mt: 3, ml: 1 }}
              color="error"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )
    );
  }
};
