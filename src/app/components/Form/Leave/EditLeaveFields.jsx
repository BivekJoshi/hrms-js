import {
  Grid,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useGetLeaveType } from '../../../hooks/leaveType/useLeaveType';
import useEditLeaveForm from '../../../hooks/leave/editLeave/useEditLeaveForm';

const leaveStatus = [
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
const EditLeaveFields = ({ onClose, isLoading, data }) => {
  const { data: employeeData } = useGetEmployee();
  const { data: leaveTypeData } = useGetLeaveType();
  const { formik } = useEditLeaveForm(data);

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypeData?.find((type) => type.id === leaveTypeId);
    return leaveType ? leaveType.leaveName : '';
  };

  const getEmployeeFullName = (employeeId) => {
    const employee = employeeData?.find((emp) => emp.id === employeeId);
    if (employee) {
      const { firstName, middleName, lastName } = employee;
      return `${firstName || ''} ${middleName || ''} ${lastName || ''}`;
    }
    return '';
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik({
        employeeId: true,
        leaveTypeId: true,
        leaveReason: true,
        fromDate: true,
        toDate: true,
        applyLeaveDays: true,
        leaveBalance: true,
        confirmById: true,
        leaveRemarks: true,
        halfDay: true,
      });
      onClose(); // Close the modal
    } else {
      toast.error('Please make sure you have filled the form correctly');
    }
  };


  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            name='employeeId'
            label='Employee Name'
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={getEmployeeFullName(formik.values.employeeId)}
            onChange={(event) => {
              formik.handleChange(event);
              formik.setFieldValue('employeeId', event.target.value);
            }}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            disabled={formik.values.employeeId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='leaveTypeId'
            label='Leave Type'
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={getLeaveTypeName(formik.values.leaveTypeId)}
            onChange={(event) => {
              formik.handleChange(event);
              formik.setFieldValue('leaveTypeId', event.target.value);
            }}
            error={
              formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)
            }
            helperText={formik.touched.leaveTypeId && formik.errors.leaveTypeId}
            disabled={formik.values.leaveTypeId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={12}>
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

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Update Leave
          </Button>
        </Grid>
      </Grid >
    )
  );
};

export default EditLeaveFields;
