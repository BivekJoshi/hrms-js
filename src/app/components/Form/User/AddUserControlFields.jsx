import React, { useContext } from 'react';
import { Grid, Button, MenuItem, TextField, Typography } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useAddUserControlForm } from '../../../pages/Auth/UserControl/Users/useAddUserControlForm';
import ThemeModeContext from '../../../../theme/ThemeModeContext';

export const AddUserControlFields = ({ onClose }) => {
  const { data: employeeData } = useGetEmployee();
  const { formik } = useAddUserControlForm();
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
      if (formik.isValid) {
        onClose();
      }
    }
  };

  const handleUserNameChange = (event, selectedEmployee) => {
    if (selectedEmployee) {
      formik.setFieldValue('employeeId', selectedEmployee.id);
      formik.setFieldValue('email', selectedEmployee.officeEmail);
    }
  };

  return (
    <>
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
            onChange={handleUserNameChange}
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
            id='email'
            name='email'
            label='Email'
            placeholder='Enter email...'
            type='email'
            fullWidth
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            Add User
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
  );
};
