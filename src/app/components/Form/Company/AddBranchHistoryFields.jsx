import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useContext } from 'react';
import useAddBranchHistoryForm from '../../../hooks/company/CompanyForm/useAddBranchHistoryForm';
import { useGetCompany } from '../../../hooks/company/useCompany';
import ThemeModeContext from '../../../../theme/ThemeModeContext';

const AddBranchHistoryFields = ({
  onClose,
  isLoading,
  id,
  branchHistoryData,
}) => {
  const { formik } = useAddBranchHistoryForm(onClose, id);
  const { data: branchData, isLoading: branchLoading } = useGetCompany();

  const { mode } = useContext(ThemeModeContext);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='branchId'
            name='branchId'
            label='Branch Name'
            fullWidth
            required
            select
            value={formik.values.branchId}
            onChange={formik.handleChange}
            error={formik.touched.branchId && Boolean(formik.errors.branchId)}
            helperText={formik.touched.branchId && formik.errors.branchId}
            variant='outlined'
            size="small"
          >
            {!branchLoading &&
              branchData?.map((option) => (
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
            id='effectiveFromDate'
            name='effectiveFromDate'
            label='Effective From Date'
            type='date'
            fullWidth
            value={formik.values.effectiveFromDate}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveFromDate &&
              Boolean(formik.errors.effectiveFromDate)
            }
            helperText={
              formik.touched.effectiveFromDate &&
              formik.errors.effectiveFromDate
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='remarks'
            name='remarks'
            label='Remarks'
            fullWidth
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant='outlined'
            multiline
            InputLabelProps={{ shrink: Boolean(formik.values.remarks) }}
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
            {branchHistoryData?.length !== 0
              ? 'Update Branch'
              : 'Add Employee Branch'}
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

export default AddBranchHistoryFields;
