import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Tab,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import { useGetLeaveType } from "../../../../hooks/leaveType/useLeaveType";
import useApplyLeaveForm from "../../../../hooks/leave/LeaveForm/useApplyLeaveForm";
import { toast } from "react-toastify";
import { useGetLeaveById } from "../../../../hooks/leave/useLeave";
import { useLocation } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const ApplyLeaveField = () => {
  const [value, setValue] = useState("1");
  const location = useLocation();
  const rowData = location?.state?.rowData || {};

  const id = rowData ? rowData.id : "";

  const { data } = useGetLeaveById(id);
  const { data: leaveTypeData } = useGetLeaveType();

  const { formik } = useApplyLeaveForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypeData?.find((type) => type.id === leaveTypeId);
    return leaveType ? leaveType.leaveName : "";
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h6">
        <b>Leave</b>
      </Typography>
      <Divider />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          Leave Type
        </Grid>
        {data ? (
          <Grid item xs={12} sm={12}>
            <TextField
              name="leaveTypeId"
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={getLeaveTypeName(formik.values.leaveTypeId)}
              // onChange={(event) => {
              //   formik.handleChange(event);
              //   formik.setFieldValue("leaveTypeId", event.target.value);
              // }}
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
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          Leave Reason
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
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
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TabContext value={value}>
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
          </TabContext>
        </Grid>

        <Grid item xs={12} sm={6}>
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
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const HalfDay = ({ formik }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          name="fromDate"
          // label="From"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formik.values.fromDate}
          onChange={formik.handleChange}
          error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
          helperText={formik.touched.fromDate && formik.errors.fromDate}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
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
    </>
  );
};

const OneDay = ({ formik }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          name="fromDate"
          // label="From"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formik.values.fromDate}
          onChange={formik.handleChange}
          error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
          helperText={formik.touched.fromDate && formik.errors.fromDate}
        />
      </Grid>
    </>
  );
};

const MultipleDays = ({ formik }) => {
  return (
    <>
      <Grid
        item
        container
        xs={12}
        sm={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <TextField
            name="fromDate"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            helperText={formik.touched.fromDate && formik.errors.fromDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ paddingLeft: "1.2rem" }}>
          <Typography variant="subtitle1">To Date:</Typography>
          <TextField
            name="toDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.toDate}
            onChange={formik.handleChange}
            error={formik.touched.toDate && Boolean(formik.errors.toDate)}
            helperText={formik.touched.toDate && formik.errors.toDate}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ApplyLeaveField;
