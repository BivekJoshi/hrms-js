import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useContext } from 'react';
import useEmployeeResourceForm from '../../../../hooks/resource/employeeResource/EmployeeResourceForm/useEmployeeResourceForm';
import { useGetAvailableOfficeResource } from '../../../../hooks/resource/officeResource/useOfficeResource';
import { useGetEmployee } from '../../../../hooks/employee/useEmployee';
import ThemeModeContext from '../../../../../theme/ThemeModeContext';

const EmployeeResourceFields = ({ onClose, isLoading, data }) => {
  const { data: availableOfficeResource } = useGetAvailableOfficeResource();
  const { data: employeeData } = useGetEmployee();
  const { mode } = useContext(ThemeModeContext);
  const { formik } = useEmployeeResourceForm(data);


  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      onClose();
    }
  };
  const submitButtonText = data ? 'Update Resource' : ' Provide Resource';

  const getEmployeeName = (employeeId) => {
    if (employeeId !== '') {
      const employee =
        data && employeeData?.find((emp) => emp.id === employeeId);
      const { firstName, middleName, lastName } = employee;
      return firstName;
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id='employeeId'
            name='employeeId'
            options={employeeData || []}
            getOptionLabel={(employee) =>
              `${employee?.firstName} ${employee?.middleName} ${employee?.lastName}`
            }
            value={employeeData?.find(
              (employee) => employee?.id === formik.values?.employeeId
            )}
            onChange={(event, newValue) => {
              // newValue will be the selected employee object
              formik.setFieldValue('employeeId', newValue?.id || ''); // Set the id in formik
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='User Name'
                placeholder='Enter User name...'
                fullWidth
                required
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id='officeResourceId'
            name='officeResourceId'
            label='Office Logistics'
            placeholder='Select Logistics'
            fullWidth
            required
            select
            value={formik.values.officeResourceId}
            onChange={formik.handleChange}
            error={
              formik.touched.officeResourceId &&
              Boolean(formik.errors.officeResourceId)
            }
            helperText={
              formik.touched.officeResourceId && formik.errors.officeResourceId
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          >
            {availableOfficeResource &&
              availableOfficeResource.map((option) => (
                <MenuItem
                  key={option?.id}
                  value={option?.id}
                  sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
                >
                  {option?.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            type='date'
            id='receiveDate'
            name='receiveDate'
            label='Received Date'
            placeholder='Select date'
            fullWidth
            required
            value={formik.values.receiveDate}
            onChange={formik.handleChange}
            error={
              formik.touched.receiveDate && Boolean(formik.errors.receiveDate)
            }
            helperText={formik.touched.receiveDate && formik.errors.receiveDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            type='date'
            id='returnDate'
            name='returnDate'
            label='Returned Date'
            placeholder='Select date'
            fullWidth
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            error={
              formik.touched.returnDate && Boolean(formik.errors.returnDate)
            }
            helperText={formik.touched.returnDate && formik.errors.returnDate}
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
            sx={{ mt: 3, ml: 1 }}
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
    )
  );
};

export default EmployeeResourceFields;
