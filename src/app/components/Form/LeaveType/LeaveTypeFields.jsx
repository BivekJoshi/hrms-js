import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import React from "react";
import { ThemeSwitch } from "../../../../theme/ThemeSwitch";
import useLeaveTypeForm from "../../../hooks/leaveType/LeaveTypeForm/useLeaveTypeForm";
import { useContext } from "react";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import RemarkField from "../../RemarkField/RemarkField";

const LEAVENAME = [
  {
    value: "CASUAL",
    label: "Casual Leave",
  },
  {
    value: "SICK",
    label: "Sick Leave",
  },
  {
    value: "ANNUAL",
    label: "Annual Leave",
  },
  {
    value: "FESTIVAL",
    label: "Festival Leave",
  },
  {
    value: "MARRIAGE",
    label: "Marriage Leave",
  },
  {
    value: "MATERNITY",
    label: "Maternity Leave",
  },
  {
    value: "MATERNITY_ADDITIONAL",
    label: "Maternity leave Additional",
  },
  {
    value: "PATERNITY",
    label: "Paternity Leave",
  },
  {
    value: "BEREAVEMENT",
    label: "Bereavement Leave",
  },
  {
    value: "UNPAID",
    label: "Unpaid Leave",
  },
];

const LeaveTypeFields = ({ onClose, isLoading, data, existingLeaveTypes }) => {
  const { formik } = useLeaveTypeForm(data, onClose);
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const filteredLeaveNames = existingLeaveTypes
    ? LEAVENAME.filter((option) => !existingLeaveTypes.includes(option.value))
    : [];

  const submitButtonText = data ? "Update Leave Type" : "Add Leave Type";
  
  return (
    !isLoading && (
      <Grid container spacing={3}>
        {data ? (
          <Grid item xs={12} sm={12}>
            <TextField
              id="leaveName"
              name="leaveName"
              label="Leave Name"
              fullWidth
              required
              disabled
              value={formik.values.leaveName}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveName && Boolean(formik.errors.leaveName)
              }
              helperText={formik.touched.leaveName && formik.errors.leaveName}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <TextField
              id="leaveName"
              name="leaveName"
              select
              label="Leave Type"
              fullWidth
              required
              value={formik.values.leaveName}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveName && Boolean(formik.errors.leaveName)
              }
              helperText={formik.touched.leaveName && formik.errors.leaveName}
              variant="outlined"
              InputLabelProps={{ shrink: Boolean(formik.values.leaveName) }}
              size="small"
            >
              {filteredLeaveNames.length === 0 ? (
                <MenuItem disabled>No remaining leave options</MenuItem>
              ) : (
                filteredLeaveNames.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={mode === "light" ? "" : { bgcolor: "#413e3e" }}
                  >
                    {option.label}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          {data ? (
            <TextField
              id="leaveTotal"
              name="leaveTotal"
              label="Total Leave Days"
              fullWidth
              required
              disabled
              type="number"
              value={formik.values.leaveTotal}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveTotal && Boolean(formik.errors.leaveTotal)
              }
              helperText={formik.touched.leaveTotal && formik.errors.leaveTotal}
              variant="outlined"
              InputLabelProps={{ shrink: Boolean(formik.values.leaveTotal) }}
              size="small"
            />
          ) : (
            <TextField
              id="leaveTotal"
              name="leaveTotal"
              label="Total Leave Days"
              fullWidth
              required
              type="number"
              value={formik.values.leaveTotal}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveTotal && Boolean(formik.errors.leaveTotal)
              }
              helperText={formik.touched.leaveTotal && formik.errors.leaveTotal}
              variant="outlined"
              InputLabelProps={{ shrink: Boolean(formik.values.leaveTotal) }}
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <RemarkField
            id="leaveDescription"
            name="leaveDescription"
            label="Leave Description"
            fullWidth
            formik={formik}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.leaveDescription),
            }}
            rows={4}
            inputProps={{ maxLength: 255 }}
            data={data?.leaveDescription}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            required
            control={
              <ThemeSwitch
                checked={formik.values.isCarryForward}
                onChange={formik.handleChange}
                name="isCarryForward"
              />
            }
            label="Carry Forward"
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
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
          >
            {submitButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default LeaveTypeFields;
