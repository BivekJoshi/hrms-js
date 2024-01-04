import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Typography,
  Autocomplete,
  Avatar,
} from '@mui/material';
import React, { useContext } from 'react';
import {
  useAddActiveEmployeeForm,
  useRemoveDeactiveEmployeeForm,
} from '../../../../hooks/employee/DeactivateEmploye/useRemoveDeactiveEmployeeForm';
import { useGetEmployee } from '../../../../hooks/employee/useEmployee';
import {
  useActiveTerminateEmployee,
  useGetDeactivatedEmployee,
  useGetDeactivatedUser,
} from '../../../../hooks/employee/DeactivateEmploye/useEmployee';
import { termintionOptions, activationOption } from './TerminationOption';
import ThemeModeContext from '../../../../../theme/ThemeModeContext';

export const EditEmployeeDeactivateFields = ({ onClose, isLoading, data }) => {
  const { palette } = useContext(ThemeModeContext);
  const { data: employeeData } = useGetEmployee();
  const { formik } = useRemoveDeactiveEmployeeForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const getEmployeeName = (employeeId) => {
    const employeeName = employeeData?.find(
      (employee) => employee?.id === employeeId
    );
    if (employeeName) {
      const { firstName, middleName, lastName } = employeeName;
      return `${firstName} ${middleName || ''} ${lastName || ''}`;
    }
    return employeeId;
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id='EmployeeId'
            name='EmployeeId'
            label='Employee Name'
            placeholder='Enter Employee Id'
            fullWidth
            value={getEmployeeName(formik.values.employeeId)}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            style={{ display: 'none' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div style={{ display: 'flex' }}>
            <div>
              <Avatar
                alt={getEmployeeName(formik.values.employeeId)}
                src='/static/images/avatar/1.jpg'
              />
            </div>
            <div>
              <Typography>
                {getEmployeeName(formik.values.employeeId)}
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
                Do you really want to Terminate employee?
              </Typography>
              <Typography>This change will be official.</Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id='effectiveDate'
            name='effectiveDate'
            label='Effective From Date'
            placeholder='Effective Date'
            type='date'
            fullWidth
            required
            value={formik.values.effectiveDate}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveDate &&
              Boolean(formik.errors.effectiveDate)
            }
            helperText={
              formik.touched.effectiveDate && formik.errors.effectiveDate
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id='terminationType'
            name='terminationType'
            options={termintionOptions || []}
            getOptionLabel={(option) => option?.label || ''}
            value={termintionOptions.find(
              (option) => option?.value === formik.values.terminationType
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue('terminationType', newValue?.value || '');
            }}
            renderOption={(props, option) => (
              <MenuItem
                {...props}
                style={{
                  backgroundColor:
                    palette?.mode === 'light'
                      ? palette.background.paper
                      : palette.background.default,
                }}
              >
                {option.label}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Termination Type'
                placeholder='Enter Employee Status'
                fullWidth
                error={
                  formik.touched.terminationType &&
                  Boolean(formik.errors.terminationType)
                }
                helperText={
                  formik.touched.terminationType &&
                  formik.errors.terminationType
                }
                variant='outlined'
                size='small'
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
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
            Yes Proceed
          </Button>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color='error'
          >
            No
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export const EditEmployeeActivateFields = ({ onClose, isLoading, data }) => {
  const { palette } = useContext(ThemeModeContext);
  const id = data?.id;
  // const { data: employeeData } = useActiveTerminateEmployee({});
  const { data: employeeData } = useGetDeactivatedEmployee();
  const { formik } = useAddActiveEmployeeForm(id);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        employeeId: true,
        terminationType: true,
        effectiveDate: true,
      });
      onClose();
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employeeData?.find(
      (employee) => employee?.id === employeeId
    );

    if (employee) {
      const { firstName, middleName, lastName } = employee;
      return `${firstName} ${middleName || ''} ${lastName || ''}`.trim();
    }

    return employeeId;
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='projectId'
            name='projectId'
            label='Employee Name'
            placeholder='Enter project Id'
            fullWidth
            value={getEmployeeName(formik.values.employeeId)}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            style={{ display: 'none' }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' component='h6'>
            Do you really want to Activate employee
            <b> {getEmployeeName(formik.values.employeeId)}</b>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id='effectiveDate'
            name='effectiveDate'
            label='Effective From Date'
            placeholder='Effective Date'
            type='date'
            fullWidth
            required
            value={formik.values.effectiveDate}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveDate &&
              Boolean(formik.errors.effectiveDate)
            }
            helperText={
              formik.touched.effectiveDate && formik.errors.effectiveDate
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id='terminationType'
            name='terminationType'
            options={activationOption || []}
            getOptionLabel={(option) => option?.label || ''}
            value={activationOption.find(
              (option) => option?.value === formik.values.terminationType
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue('terminationType', newValue?.value || '');
            }}
            renderOption={(props, option) => (
              <MenuItem
                {...props}
                style={{
                  backgroundColor:
                    palette?.mode === 'light'
                      ? palette.background.paper
                      : palette.background.default,
                }}
              >
                {option.label}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Reason'
                placeholder='Select Reason'
                fullWidth
                error={
                  formik.touched.terminationType &&
                  Boolean(formik.errors.terminationType)
                }
                helperText={
                  formik.touched.terminationType &&
                  formik.errors.terminationType
                }
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            )}
          />

          {/* <TextField
            id="terminationType"
            select
            name="terminationType"
            label="Termanation Type"
            placeholder="Enter Employee staus"
            fullWidth
            value={formik.values.terminationType}
            onChange={formik.handleChange}
            error={
              formik.touched.terminationType &&
              Boolean(formik.errors.terminationType)
            }
            helperText={
              formik.touched.terminationType && formik.errors.terminationType
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {activationOption?.map((option) => (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField> */}
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
            Yes Proceed
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
};
