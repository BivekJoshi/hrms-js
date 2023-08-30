import { Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const ApplyLeaveField = () => {
  return (
    <>
      <Typography variant="h6">
        <b>Leave</b>
      </Typography>
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={2} md={2}style={ {borderBottom: "1px solid black"}}>
          Leave Type
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <TextField
            name="leaveTypeId"
            // label="Leave Type"
            required
            // InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
            // value={getLeaveTypeName(formik.values.leaveTypeId)}
            // onChange={(event) => {
            //   formik.handleChange(event);
            //   formik.setFieldValue("leaveTypeId", event.target.value);
            // }}
            // error={
            //   formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)
            // }
            // helperText={formik.touched.leaveTypeId && formik.errors.leaveTypeId}
            // disabled={formik.values.leaveTypeId}
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          Leave Reason
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="leaveTypeId"
            // label="Leave Type"
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            rows={3}
            multiline

            // variant="standard"
            // value={getLeaveTypeName(formik.values.leaveTypeId)}
            // onChange={(event) => {
            //   formik.handleChange(event);
            //   formik.setFieldValue("leaveTypeId", event.target.value);
            // }}
            // error={
            //   formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)
            // }
            // helperText={formik.touched.leaveTypeId && formik.errors.leaveTypeId}
            // disabled={formik.values.leaveTypeId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="fromDate"
            label="From"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
            // value={formik.values.fromDate}
            // onChange={formik.handleChange}
            // error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            // helperText={formik.touched.fromDate && formik.errors.fromDate}
          />
        </Grid>
        <Grid item xs={12} sm={5} style={{marginLeft:10}}>
          <TextField
            name="toDate"
            label="To"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
            // value={formik.values.toDate}
            // onChange={formik.handleChange}
            // error={formik.touched.toDate && Boolean(formik.errors.toDate)}
            // helperText={formik.touched.toDate && formik.errors.toDate}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ApplyLeaveField;
