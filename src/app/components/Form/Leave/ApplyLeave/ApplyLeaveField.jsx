import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetLeaveType } from "../../../../hooks/leaveType/useLeaveType";
import useApplyLeaveForm from "../../../../hooks/leave/LeaveForm/useApplyLeaveForm";
import { toast } from "react-toastify";
import { useGetLeaveById } from "../../../../hooks/leave/useLeave";
import { useLocation } from 'react-router-dom';

const ApplyLeaveField = () => {
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
        <Grid item xs={12} sm={12} md={12}>
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
                // label="Leave Name"
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
        <Grid item xs={12} sm={6}>
          From Date
        </Grid>
        <Grid item xs={12} sm={6}>
          To Date
        </Grid>
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
        <Grid item xs={12} sm={6}>
          <TextField
            name="toDate"
            // label="To"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.toDate}
            onChange={formik.handleChange}
            error={formik.touched.toDate && Boolean(formik.errors.toDate)}
            helperText={formik.touched.toDate && formik.errors.toDate}
          />
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

export default ApplyLeaveField;
