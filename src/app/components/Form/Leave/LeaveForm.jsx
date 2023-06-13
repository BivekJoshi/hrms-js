import {
  Grid,
  TextField,
  Button,
  Box,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useAddLeaveForm from '../../../hooks/leave/addLeave/useAddLeaveForm';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useGetLeaveType } from '../../../hooks/leaveType/useLeaveType';

const leaveStatus=[
  {
    value: 'APPROVED',
    label: 'Approved',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
  },
  {
    value: 'PENDING',
    label: 'Pending',
  },
];
const LeaveForm = ({ onClose, isLoading }) => {
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();
  const { data: leaveTypeData, isLoading: loadingLeaveType } = useGetLeaveType();


  const { formik } = useAddLeaveForm();

  const handleOK = () => {
    formik.setFieldTouched('');
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id='employeeId'
            name='employeeId'
            options={employeeData}
            getOptionLabel={(option) => `${option.firstName} ${option.middleName} ${option.lastName}`}
            value={formik.values.employeeId || null}
            onChange={(event, value) => formik.setFieldValue('employeeId', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Employee Name'
                fullWidth
                error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                helperText={formik.touched.employeeId && formik.errors.employeeId}
                variant='outlined'
                autoFocus
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id='leaveTypeId'
            name='leaveTypeId'
            options={leaveTypeData}
            getOptionLabel={(option) => `${option.leaveName}`}
            value={formik.values.leaveTypeId || null}
            onChange={(event, value) => formik.setFieldValue('leaveTypeId', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Leave Name'
                fullWidth
                error={formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)}
                helperText={formik.touched.leaveTypeId && formik.errors.leaveTypeId}
                variant='outlined'
                autoFocus
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name='fromDate'
            label='From'
            type='date'
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            error={
              formik.touched.fromDate && Boolean(formik.errors.fromDate)
            }
            helperText={formik.touched.fromDate && formik.errors.fromDate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name='toDate'
            label='To'
            type='date'
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.toDate}
            onChange={formik.handleChange}
            error={
              formik.touched.toDate && Boolean(formik.errors.toDate)
            }
            helperText={formik.touched.toDate && formik.errors.toDate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='leaveStatus'
            name='leaveStatus'
            select
            label='leaveStatus'
            placeholder='Select your leaveStatus'
            fullWidth
            value={formik.values.leaveStatus}
            onChange={formik.handleChange}
            error={formik.touched.leaveStatus && Boolean(formik.errors.leaveStatus)}
            helperText={formik.touched.leaveStatus && formik.errors.leaveStatus}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {leaveStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='leaveReason'
            name='leaveReason'
            label='leave Reason'
            placeholder='Enter leave Reason'
            fullWidth
            value={formik.values.leaveReason}
            onChange={formik.handleChange}
            error={formik.touched.leaveReason && Boolean(formik.errors.leaveReason)}
            helperText={formik.touched.leaveReason && formik.errors.leaveReason}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>



        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              formik.handleSubmit();
              // onClose;
              formik.isValid
                ? handleOK()
                : toast.error(
                  'Please make sure you have filled the form correctly'
                );
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Add Leave Type
          </Button>
        </Box>
      </Grid>
    )
  );
};

export default LeaveForm;
