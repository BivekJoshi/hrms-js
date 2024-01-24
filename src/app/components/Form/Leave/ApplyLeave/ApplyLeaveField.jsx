import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Typography, Tab, RadioGroup } from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";
import React, { useState } from "react";
import { useGetLeaveType } from "../../../../hooks/leaveType/useLeaveType";
import useApplyLeaveForm from "../../../../hooks/leave/LeaveForm/useApplyLeaveForm";
import { useLocation } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RemarkField from "../../../RemarkField/RemarkField";

const leaveOptions = [
  { id: "HALF_DAY", label: "Half Day" },
  { id: "ONE_DAY", label: "One Day" },
  { id: "MULTI_DAY", label: "Multiple Days" },
];

const ApplyLeaveField = () => {
  // const [value, setValue] = useState("1");
  const location = useLocation();
  const data = location?.state?.data || null;
  const { formik } = useApplyLeaveForm(data);

  const { data: leaveTypeData } = useGetLeaveType();

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const capitalize = (str) => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypeData?.find((type) => type.id === leaveTypeId);
    return leaveType ? leaveType.leaveName : "";
  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const submitButtonText = "Add Leave";
  const handleChange = (e) => {
    formik.setFieldValue("leavePeriod", e.target?.value);
  };

  const value = formik.values?.leavePeriod;
  return (
    <>
      <Typography variant="h6" textAlign="center" mb={2}>
        <b>Apply Leave</b>
      </Typography>
      <Divider sx={{ mb: "1rem" }} />
      <Grid container spacing={3}>
        {data && (
          <Grid item xs={12} sm={6}>
            Leave Type
          </Grid>
        )}
        {data ? (
          <Grid item xs={12} sm={12}>
            <TextField
              name="leaveTypeId"
              label="Leave Type"
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={getLeaveTypeName(formik.values.leaveTypeId)}
              error={
                formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)
              }
              helperText={
                formik.touched.leaveTypeId && formik.errors.leaveTypeId
              }
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <Autocomplete
              id="leaveTypeId"
              name="leaveTypeId"
              options={leaveTypeData}
              getOptionLabel={(option) =>
                `${capitalize(option.leaveName)} Leave`
              }
              value={formik.values.leaveTypeId || null}
              onChange={(event, value) =>
                formik.setFieldValue("leaveTypeId", value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Leave Type"
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
                  size="small"
                />
              )}
            />
            {/* <Autocomplete
              id="leaveTypeId"
              name="leaveTypeId"
              options={leaveTypeData}
              getOptionLabel={(option) =>
                `${capitalize(option.leaveName)} Leave`
              }
              value={formik.values.leaveTypeId || null}
              onChange={(event, value) =>
                formik.setFieldValue("leaveTypeId", value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
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
            /> */}
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          <TextField
            name="leavePeriod"
            select
            value={formik.values?.leavePeriod}
            label="Leave Period"
            placeholder="Select leave period"
            fullWidth
            required
            onChange={handleChange}
            InputLabelProps={{ shrink: Boolean(formik.values.leavePeriod) }}
            error={
              formik.touched.leavePeriod && Boolean(formik.errors.leavePeriod)
            }
            helperText={formik.touched.leavePeriod && formik.errors.leavePeriod}
            size="small"
          >
            {leaveOptions?.map((option) => (
              <MenuItem key={option?.id} value={option?.id}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
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
            <TabPanel value="1">
              <HalfDay formik={formik} />
            </TabPanel>
            <TabPanel value="2">
              <OneDay formik={formik} />
            </TabPanel>
            <TabPanel value="3">
              <MultipleDays formik={formik} />
            </TabPanel>
          </TabContext> */}
          {value === "HALF_DAY" && <HalfDay formik={formik} />}
          {value === "ONE_DAY" && <OneDay formik={formik} />}
          {value === "MULTI_DAY" && <MultipleDays formik={formik} />}
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          Leave Remarks
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="leaveRemarks"
            name="leaveRemarks"
            placeholder="Any additional Details to add"
            fullWidth
            value={formik.values.leaveRemarks}
            onChange={formik.handleChange}
            error={
              formik.touched.leaveRemarks && Boolean(formik.errors.leaveRemarks)
            }
            helperText={
              formik.touched.leaveRemarks && formik.errors.leaveRemarks
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          Leave Reason
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <RemarkField
            id="leaveReason"
            name="leaveReason"
            label="Leave Reason"
            fullWidth
            req={true}
            formik={formik}
            data={data?.leaveReason}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.leaveReason),
            }}
            rows={3}
            inputProps={{ maxLength: 255 }}
          />
          {/* <TextField
            id="leaveReason"
            name="leaveReason"
            // label="Leave Reason"
            placeholder="Enter leave Reason"
            fullWidth
            multiline
            rows={3}
            value={formik.values.leaveReason}
            onChange={formik.handleChange}
            error={
              formik.touched.leaveReason && Boolean(formik.errors.leaveReason)
            }
            helperText={formik.touched.leaveReason && formik.errors.leaveReason}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          /> */}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {/* <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Submit
          </Button> */}
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1, color: "#fff", textTransform: "capitalize" }}
          >
            {submitButtonText}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const DateInput = ({ formik, isHalfDay, isMultipleDays }) => {
  const [halfType, setHalfType] = useState("FIRST_HALF");

  // const handleFromDateChange = (e) => {
  //   const fromDateValue = e.target.value;
  //   if (fromDateValue) {
  //     setHalfType('FIRST_HALF');
  //   }
  //   formik.handleChange(e);
  //   formik.setFieldValue('toDate', fromDateValue);
  //   formik.setFieldValue('halfLeaveType', null);
  //   if (isHalfDay) {
  //     formik.setFieldValue('isHalfDay', true);
  //     formik.setFieldValue('halfLeaveType', halfType);
  //   }
  // };
  const handleFromDateChange = (e) => {
    const fromDateValue = e.target.value;
    if (fromDateValue) {
      setHalfType("FIRST_HALF");
    }
    formik.handleChange(e);
    formik.values.fromDate = e.target.value;
    formik.values.toDate = e.target.value;
    formik.values.halfLeaveType = null;
    if (isHalfDay) {
      formik.setFieldValue("isHalfDay", true);
      formik.setFieldValue("halfLeaveType", halfType);
    }
  };

  // const currentDate = new Date().toISOString().split('T')[0];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const newDate = currentDate.toISOString().split("T")[0];
  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Grid item xs={12} sm={isMultipleDays ? 6 : 12}>
          <TextField
            name="fromDate"
            label={isMultipleDays ? "Date From" : "Select Date"}
            type="date"
            inputProps={{
              min: newDate,
            }}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.fromDate}
            onChange={handleFromDateChange}
            error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            helperText={formik.touched.fromDate && formik.errors.fromDate}
            size="small"
          />
        </Grid>
        {isMultipleDays && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="toDate"
              label={"Date To"}
              type="date"
              inputProps={{
                min: formik.values.fromDate || newDate,
              }}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.toDate}
              onChange={formik.handleChange}
              error={formik.touched.toDate && Boolean(formik.errors.toDate)}
              helperText={formik.touched.toDate && formik.errors.toDate}
              size="small"
              disabled={!formik?.values?.fromDate}
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

export default ApplyLeaveField;
