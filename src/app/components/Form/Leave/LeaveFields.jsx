import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  Box,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useGetLeaveType } from '../../../hooks/leaveType/useLeaveType';
import useLeaveForm from '../../../hooks/leave/LeaveForm/useLeaveForm';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import { ThemeSwitch } from '../../../../theme/ThemeSwitch';
import useAuth from '../../../../auth/hooks/component/login/useAuth';
import { ButtonComponent } from '../../Button/ButtonComponent';

const leaveStatus = [
  {
    value: 'APPROVED',
    label: 'Approved',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
  },
];

export const EditLeaveFields = ({ onClose, isLoading, data }) => {
  const { isManager, isSuperAdmin } = useAuth();
 
  const { formik } = useLeaveForm(data);
  const { mode } = useContext(ThemeModeContext);
  
  const handleFormSubmit = () => {
    formik.handleSubmit();
    onClose();

    // if (formik.isValid) {
    //   formik.resetForm({
    //     isHalfDay: false,
    //   });
    //   onClose();
    // }
  };
// console.log(formik);
  const submitButtonText = data ? 'Update Leave' : 'Add Leave';

  if (isManager || isSuperAdmin) {
    return (
      !isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant='p'>
              {data?.employeeName} wants to take a{' '}
              {data?.leaveType} Leave From Date{' '}
              {data?.fromDate} To Date {data?.toDate}. Total of{' '}
              {formik.values.applyLeaveDays} Days
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='leaveStatus'
              name='leaveStatus'
              select
              label='Leave Status'
              placeholder='Select your leaveStatus'
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
              variant='standard'
              //
              // InputLabelProps={{ shrink: true }}
            >
              {leaveStatus.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='leaveRemarks'
              name='leaveRemarks'
              label='Message'
              placeholder='Enter a message'
              fullWidth
              multiline
              rows={2}
              value={formik.values.leaveRemarks}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveRemarks &&
                Boolean(formik.errors.leaveRemarks)
              }
              helperText={
                formik.touched.leaveRemarks && formik.errors.leaveRemarks
              }
              variant='outlined'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            <Button
              variant='contained'
              onClick={handleFormSubmit}
              sx={{ mt: 3, ml: 1, color: '#fff' }}
            >
              Submit
            </Button>
            <Button
              variant='contained'
              onClick={onClose}
              sx={{ mt: 3, ml: 1 }}
              color='error'
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )
    );
  }
};

export const LeaveFields = ({ onClose, isLoading, data }) => {
  const { data: employeeData } = useGetEmployee();
  const { data: leaveTypeData } = useGetLeaveType();
  const { formik } = useLeaveForm(data,onClose);
  const { mode } = useContext(ThemeModeContext);
  const employeeId = data?.employeeId;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypeData?.find((type) => type.id === leaveTypeId);
    return leaveType ? leaveType.leaveName : '';
  };

  const getEmployeeFullName = () => {
    const employee = employeeData?.find((emp) => emp.id === employeeId);
    if (employee) {
      const { firstName, middleName, lastName } = employee;
      return (
        <Box sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}>
          {firstName || ''} {middleName || ''} {lastName || ''}
        </Box>
      );
    }
    return '';
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const isMoreThanOneDayDifference = () => {
    const fromDate = new Date(formik.values.fromDate);
    const toDate = new Date(formik.values.toDate);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day

    return toDate - fromDate > oneDayInMilliseconds;
  };

  const submitButtonText = data ? 'Update Leave' : 'Add Leave';
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    !isLoading && (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {data ? (
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
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
                disabled={formik.values.employeeId}
              />
            ) : (
              <Autocomplete
                id='employeeId'
                name='employeeId'
                options={employeeData}
                getOptionLabel={(option) =>
                  `${option?.firstName} ${option?.middleName} ${option?.lastName}`
                }
                value={formik.values.employeeId || null}
                onChange={(event, value) =>
                  formik.setFieldValue('employeeId', value)
                }
                renderInput={(params) => (
                  <TextField
                    bgcolor='black'
                    {...params}
                    label='Employee Name'
                    fullWidth
                    requireds
                    error={
                      formik.touched.employeeId &&
                      Boolean(formik.errors.employeeId)
                    }
                    helperText={
                      formik.touched.employeeId && formik.errors.employeeId
                    }
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            )}
          </Grid>
          {data ? (
            <Grid item xs={12} sm={12}>
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
                  formik.touched.leaveTypeId &&
                  Boolean(formik.errors.leaveTypeId)
                }
                helperText={
                  formik.touched.leaveTypeId && formik.errors.leaveTypeId
                }
                disabled={formik.values.leaveTypeId}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12}>
              <Autocomplete
                id='leaveTypeId'
                name='leaveTypeId'
                options={leaveTypeData}
                getOptionLabel={(option) =>
                  `${capitalize(option.leaveName)} Leave`
                }
                value={formik.values.leaveTypeId || null}
                onChange={(event, value) =>
                  formik.setFieldValue('leaveTypeId', value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Leave Name'
                    fullWidth
                    required
                    error={
                      formik.touched.leaveTypeId &&
                      Boolean(formik.errors.leaveTypeId)
                    }
                    helperText={
                      formik.touched.leaveTypeId && formik.errors.leaveTypeId
                    }
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              name='fromDate'
              label='From'
              type='date'
              inputProps={{
                min: currentDate, // Disable past date selections
              }}
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
              name='toDate'
              label='To'
              type='date'
              inputProps={{
                min: formik.values.fromDate || currentDate,
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.toDate}
              onChange={formik.handleChange}
              error={formik.touched.toDate && Boolean(formik.errors.toDate)}
              helperText={formik.touched.toDate && formik.errors.toDate}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='leaveReason'
              name='leaveReason'
              label='Leave Reason'
              placeholder='Enter leave Reason'
              fullWidth
              multiline
              rows={2}
              value={formik.values.leaveReason}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveReason && Boolean(formik.errors.leaveReason)
              }
              helperText={
                formik.touched.leaveReason && formik.errors.leaveReason
              }
              variant='outlined'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              id="leaveStatus"
              name="leaveStatus"
              select
              label="Leave Status"
              placeholder="Select your leaveStatus"
              fullWidth
              required
              value={formik.values.leaveStatus}
              onChange={formik.handleChange}
              error={
                formik.touched.leaveStatus && Boolean(formik.errors.leaveStatus)
              }
              helperText={formik.touched.leaveStatus && formik.errors.leaveStatus}
              variant="outlined"
              
              InputLabelProps={{ shrink: true }}
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
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <ThemeSwitch
                  checked={formik.values.isHalfDay}
                  onChange={formik.handleChange}
                  name='isHalfDay'
                  disabled={isMoreThanOneDayDifference()}
                />
              }
              label='Is Half Day Leave'
            />
          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            <Button
              variant='contained'
              onClick={handleFormSubmit}
              sx={{ mt: 3, ml: 1, color: '#fff' }}
            >
              {submitButtonText}
            </Button>
            <Button
              variant='contained'
              onClick={onClose}
              sx={{ mt: 3, ml: 1 }}
              color='error'
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </>
    )
  );
};
