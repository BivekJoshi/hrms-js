import React, { useContext, useEffect } from 'react';
import { useGetDepartment } from '../../../hooks/department/useDepartment';
import { useGetCompany } from '../../../hooks/company/useCompany';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { useGetDesignation } from '../../../hooks/designation/useDesignation';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import useEmploymentHistory from '../../../hooks/employee/useEmploymentHistory';
import RemarkField from '../../RemarkField/RemarkField';

const AddEmploymentHistoryFields = ({ onClose, multiplePosition }) => {
  const { formik } = useEmploymentHistory(onClose);
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (multiplePosition) {
      formik.setFieldValue('multiplePosition', true);
    }
  }, [multiplePosition]);

  const { data: departmentData, isLoading: loadingDepartment } =
    useGetDepartment();
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();
  const { data: designationData, isLoading: loadingDesignation } =
    useGetDesignation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <TextField
          id='departmentId'
          name='departmentId'
          select
          label='Department Name'
          placeholder='Select your department'
          fullWidth
          required
          value={!loadingDepartment && formik.values.departmentId}
          onChange={formik.handleChange}
          error={
            formik.touched.departmentId && Boolean(formik.errors.departmentId)
          }
          helperText={formik.touched.departmentId && formik.errors.departmentId}
          variant='outlined'
        >
          {!loadingDepartment &&
            departmentData?.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
                sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
              >
                {option.departmentName}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='branchId'
          name='branchId'
          select
          label='Branch Name'
          placeholder='Select your branch'
          fullWidth
          required
          value={!loadingCompany && formik.values.branchId}
          onChange={formik.handleChange}
          error={formik.touched.branchId && Boolean(formik.errors.branchId)}
          helperText={formik.touched.branchId && formik.errors.branchId}
          variant='outlined'
        >
          {!loadingCompany &&
            companyData?.map((option) => (
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
      <Grid item xs={12} sm={12}>
        <TextField
          id='positionId'
          name='positionId'
          select
          label='Position Name'
          placeholder='Select your branch'
          fullWidth
          required
          value={!loadingCompany && formik.values.positionId}
          onChange={formik.handleChange}
          error={formik.touched.positionId && Boolean(formik.errors.positionId)}
          helperText={formik.touched.positionId && formik.errors.positionId}
          variant='outlined'
        >
          {!loadingDesignation &&
            designationData?.map((option) => (
              <MenuItem
                key={option?.id}
                value={option?.id}
                sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
              >
                {option?.positionName}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id='effectiveDateFrom'
          name='effectiveDateFrom'
          label='Effective From Date'
          type='date'
          fullWidth
          required
          value={formik.values.effectiveDateFrom}
          onChange={formik.handleChange}
          error={
            formik.touched.effectiveDateFrom &&
            Boolean(formik.errors.effectiveDateFrom)
          }
          helperText={
            formik.touched.effectiveDateFrom && formik.errors.effectiveDateFrom
          }
          variant='outlined'
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {/* <Grid item xs={12} sm={12}>
        <TextField
          id="effectiveDateTo"
          name="effectiveDateTo"
          label="Effective To Date"
          type="date"
          fullWidth
          value={formik.values.effectiveDateTo}
          onChange={formik.handleChange}
          inputProps={{
            max: formik?.values?.effectiveDateFrom,
          }}
          error={
            formik.touched.effectiveDateTo &&
            Boolean(formik.errors.effectiveDateTo)
          }
          helperText={
            formik.touched.effectiveDateTo && formik.errors.effectiveDateTo
          }
          variant='outlined'
          InputLabelProps={{ shrink: true }}
        />
      </Grid> */}
      <Grid item xs={12} sm={12}>
        <RemarkField
          id='remarks'
          name='remarks'
          label='Remarks'
          fullWidth
          formik={formik}
          maxLength={255}
          variant='outlined'
          multiline
          rows={4}
          inputProps={{ maxLength: 250 }}
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
          Add
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
  );
};

export default AddEmploymentHistoryFields;
