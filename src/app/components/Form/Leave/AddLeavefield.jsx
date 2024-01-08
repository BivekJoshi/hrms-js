import {
  Grid,
  TextField,
  Button,
  Autocomplete,
  Radio,
  MenuItem,
} from "@mui/material";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { useLeaveForm } from "../../../hooks/leave/LeaveForm/useLeaveForm";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetLeaveType } from "../../../hooks/leaveType/useLeaveType";
import { useState } from "react";
import "./Style.css";
import renderOptions from "../../../utils/renderOptions";

const leaveOptions = [
  { id: "HALF_DAY", label: "Half Day" },
  { id: "ONE_DAY", label: "One Day" },
  { id: "MULTI_DAY", label: "Multiple Days" },
];

export const LeaveFields = ({ onClose, isLoading, data }) => {
  const { data: employeeData } = useGetEmployee();
  const { data: leaveTypeData } = useGetLeaveType();
  const { formik } = useLeaveForm(data, onClose);
  console.log(formik.values);

  const capitalize = (str) => {
    return str?.charAt(0)?.toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const submitButtonText = "Add Leave";
  const handleChange = (e) => {
    formik.setFieldValue("leavePeriod", e.target?.value);
  };

  const value = formik.values?.leavePeriod;
  return (
    !isLoading && (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="employeeId"
            name="employeeId"
            options={employeeData || []}
            value={employeeData?.find(
              (employee) => employee?.employeeId === formik.values?.employeeId
            )}
            onChange={(event, value) => {
              console.log(value);
              formik.setFieldValue("employeeId", value?.employeeId);
            }}
            renderInput={(params) => (
              <TextField
                bgcolor="black"
                {...params}
                label="Employee Name"
                placeholder="Select employee Name"
                fullWidth
                required
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            renderOption={(props, option) =>
              renderOptions(props, option, "label")
            }
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="leaveTypeId"
            name="leaveTypeId"
            options={leaveTypeData}
            getOptionLabel={(option) => `${capitalize(option.leaveName)} Leave`}
            value={formik.values.leaveTypeId || null}
            onChange={(event, value) =>
              formik.setFieldValue("leaveTypeId", value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Leave Name"
                placeholder="Select leave type"
                fullWidth
                required
                error={
                  formik.touched.leaveTypeId &&
                  Boolean(formik.errors.leaveTypeId)
                }
                helperText={
                  formik.touched.leaveTypeId && formik.errors.leaveTypeId
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab label="Half Day" value="1" />
              <Tab label="One Day" value="2" />
              <Tab label="Multiple Days" value="3" />
            </TabList>
            <Grid>
              <TabPanel value="1">
                <HalfDay formik={formik} />
              </TabPanel>
              <TabPanel value="2">
                <OneDay formik={formik} />
              </TabPanel>
              <TabPanel value="3">
                <MultipleDays formik={formik} />
              </TabPanel>
            </Grid>
          </TabContext> */}
          <TextField
            name="leavePeriod"
            select
            variant="outlined"
            value={formik.values?.leavePeriod}
            label="Leave Period"
            placeholder="Select leave period"
            fullWidth
            required
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={
              formik.touched.leavePeriod && Boolean(formik.errors.leavePeriod)
            }
            helperText={formik.touched.leavePeriod && formik.errors.leavePeriod}
          >
            {leaveOptions?.map((option) => (
              <MenuItem key={option?.id} value={option?.id}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          {value === "HALF_DAY" && <HalfDay formik={formik} />}
          {value === "ONE_DAY" && <OneDay formik={formik} />}
          {value === "MULTI_DAY" && <MultipleDays formik={formik} />}
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="leaveReason"
            name="leaveReason"
            label="Leave Reason"
            placeholder="Enter leave reason"
            fullWidth
            required
            multiline
            rows={2}
            value={formik.values.leaveReason}
            onChange={formik.handleChange}
            error={
              formik.touched.leaveReason && Boolean(formik.errors.leaveReason)
            }
            helperText={formik.touched.leaveReason && formik.errors.leaveReason}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
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
            sx={{ mt: 3, ml: 1, color: "#fff", textTransform: "capitalize" }}
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

const DateInput = ({ formik, isHalfDay, isMultipleDays }) => {
  const [halfType, setHalfType] = useState("");

  const handleFromDateChange = (e) => {
    const fromDateValue = e.target.value;
    if(fromDateValue) {
      setHalfType('FIRST_HALF')
    }
    formik.handleChange(e);
    formik.setFieldValue("toDate", fromDateValue);
    formik.setFieldValue("halfLeaveType", null);
    if (isHalfDay) {
      formik.setFieldValue("isHalfDay", true);
      formik.setFieldValue("halfLeaveType", halfType);
    }
  };
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Grid item xs={12} sm={isMultipleDays ? 6 : 12}>
          <TextField
            name="fromDate"
            label={isMultipleDays ? "Date From" : "Select Date"}
            type="date"
            inputProps={{
              min: currentDate, // Disable past date selections
            }}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.fromDate}
            onChange={handleFromDateChange}
            error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            helperText={formik.touched.fromDate && formik.errors.fromDate}
          />
        </Grid>
        {isMultipleDays && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="toDate"
              label={"Date To"}
              type="date"
              inputProps={{
                min: formik.values.fromDate || currentDate,
              }}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.toDate}
              onChange={formik.handleChange}
              error={formik.touched.toDate && Boolean(formik.errors.toDate)}
              helperText={formik.touched.toDate && formik.errors.toDate}
            />
          </Grid>
        )}
      </div>
      {isHalfDay && (
        <Grid item xs={12} sm={12}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="halfLeaveType"
            value={formik.values.halfLeaveType || halfType}
            onChange={formik.handleChange}
            style={{ display: "flex", marginTop: "0.6rem" }}
          >
            <FormControlLabel
              value="FIRST_HALF"
              control={<Radio />}
              label="First Half"
            />
            <FormControlLabel
              value="SECOND_HALF"
              control={<Radio />}
              label="Second Half"
            />
          </RadioGroup>
        </Grid>
      )}
    </>
  );
};

const HalfDay = ({ formik }) => <DateInput formik={formik} isHalfDay={true} />;

const OneDay = ({ formik }) => <DateInput formik={formik} />;

const MultipleDays = ({ formik }) => (
  <DateInput formik={formik} isMultipleDays={true} />
);
