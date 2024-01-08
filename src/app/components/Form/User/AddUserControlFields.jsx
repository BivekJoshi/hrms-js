import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useGetNoneUser } from '../../../hooks/employee/useEmployee';
import { useAddUserControlForm } from '../../../pages/Auth/UserControl/Users/useAddUserControlForm';
import { ButtonComponent } from '../../Button/ButtonComponent';
import renderOptions from '../../../utils/renderOptions';

export const AddUserControlFields = ({ onClose }) => {
  const { data: employeeData } = useGetNoneUser();
  const { formik } = useAddUserControlForm(onClose);
  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
    }
  };

  const handleUserNameChange = (event, selectedEmployee) => {
    if (selectedEmployee) {
      formik.setFieldValue('employeeId', selectedEmployee.id);
      formik.setFieldValue('email', selectedEmployee.email);
    }
  };

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <Typography sx={{ color: 'orange' }}>
            To add an employee, user's permanent address detail must be Filled
          </Typography> */}
          <br />
          <Autocomplete
            id='employeeId'
            name='employeeId'
            options={employeeData || []}
            getOptionLabel={(option) => option.label}
            value={employeeData?.find(
              (employee) => employee?.id === formik.values?.employeeId
            )}
            filterSelectedOptions
            onChange={handleUserNameChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='User Name'
                placeholder='Enter User name'
                fullWidth
                required
                variant='outlined'
                size='small'
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
              />
            )}
            renderOption={(props, option) =>
              renderOptions(props, option, `label`)
            }
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
            size='small'
          />
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <ButtonComponent
            variant='contained'
            OnClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1, color: '#fff' }}
            buttonName={'Add User'}
          />
          <ButtonComponent
            variant='contained'
            OnClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            BGColor={'#d32f2f'}
            buttonName={'Cancel'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
