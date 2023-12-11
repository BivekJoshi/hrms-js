import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { ThemeSwitch } from "../../../../theme/ThemeSwitch";
import useLeaveTypeForm from "../../../hooks/leaveType/LeaveTypeForm/useLeaveTypeForm";
import { useContext } from "react";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

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
  const { formik } = useLeaveTypeForm(data,onClose);
  const {mode} = useContext(ThemeModeContext);

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
              placeholder="Enter leave name"
              fullWidth
              required
              value={formik.values.leaveName}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveName && Boolean(formik.errors.leaveName)
              }
              helperText={formik.touched.leaveName && formik.errors.leaveName}
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <TextField
              id="leaveName"
              name="leaveName"
              select
              label="Leave Type"
              placeholder="Select your leaveName"
              fullWidth
              required
              value={formik.values.leaveName}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveName && Boolean(formik.errors.leaveName)
              }
              helperText={formik.touched.leaveName && formik.errors.leaveName}
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            >
              {filteredLeaveNames.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={mode === "light" ? "" : { bgcolor: "#413e3e" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          <TextField
            id="leaveTotal"
            name="leaveTotal"
            label="Total Leave Days"
            placeholder="Enter total leave days"
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="leaveDescription"
            name="leaveDescription"
            label="Description"
            placeholder="Enter leave description"
            fullWidth
            multiline
            rows={3}
            value={formik.values.leaveDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.leaveDescription &&
              Boolean(formik.errors.leaveDescription)
            }
            helperText={
              formik.touched.leaveDescription && formik.errors.leaveDescription
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
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
        </Grid>
      </Grid>
    )
  );
};

export default LeaveTypeFields;
