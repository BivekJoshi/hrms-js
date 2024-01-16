import { Grid, Button, TextField, MenuItem, Autocomplete } from '@mui/material';
import React, { useContext } from 'react';
import useAddProjectForm from '../../../hooks/project/addProject/useAddProjectForm';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useGetCompany } from '../../../hooks/company/useCompany';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import { ButtonComponent } from '../../Button/ButtonComponent';

const projectOptions = [
  // {
  //   value: "WORK_IN_PROGRESS",
  //   label: "Work in progress",
  //   id: 1,
  // },
  {
    value: 'COMPLETED',
    label: 'Completed',
    id: 2,
  },
  // {
  //   value: "DELAYED",
  //   label: "Delayed",
  //   id: 3,
  // },
  // {
  //   value: "PENDING",
  //   label: "Pending",
  //   id: 4,
  // },
];

const AddprojectFields = ({ onClose, isLoading }) => {
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();
  const { mode } = useContext(ThemeModeContext);

  const { formik } = useAddProjectForm(onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='projectName'
            name='projectName'
            label='Project Name'
            fullWidth
            required
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={
              formik.touched.projectName && Boolean(formik.errors.projectName)
            }
            helperText={formik.touched.projectName && formik.errors.projectName}
            variant='outlined'
            InputLabelProps={{ shrink: Boolean(formik.values.projectName) }}
            size='small'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name='startDate'
            label='Start Date'
            type='date'
            inputProps={{
              min: currentDate,
            }}
            fullWidth
            required
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name='endDate'
            label='Deadline Date'
            type='date'
            inputProps={{
              min: formik.values.startDate,
            }}
            fullWidth
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id='projectLeadId'
            name='projectLeadId'
            options={employeeData || []}
            getOptionLabel={(employee) => employee?.label}
            value={employeeData?.find(
              (employee) => employee?.employeeId === formik.values?.employeeId
            )}
            onChange={(event, selectedEmployee) => {
              if (selectedEmployee) {
                formik.setFieldValue(
                  'projectLeadId',
                  selectedEmployee.employeeId
                );
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Project Leader'
                fullWidth
                required
                variant='outlined'
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
                size='small'
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id='companyId'
            name='companyId'
            select
            label='Project Branch Name'
            placeholder='Enter Company Id'
            fullWidth
            required
            value={formik.values.companyId}
            onChange={formik.handleChange}
            error={formik.touched.companyId && Boolean(formik.errors.companyId)}
            helperText={formik.touched.companyId && formik.errors.companyId}
            variant='outlined'
            InputLabelProps={{ shrink: Boolean(formik.values.companyId) }}
            size='small'
          >
            {!loadingCompany &&
              companyData.map((option) => (
                <MenuItem
                  key={option?.id}
                  value={option?.id}
                  sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
                >
                  {option?.branchName}
                </MenuItem>
              ))}
          </TextField>
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
            disabled={!formik.dirty}
            sx={{ mt: 3, ml: 1 }}
            buttonName={'Add Project'}
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
    )
  );
};

export default AddprojectFields;
