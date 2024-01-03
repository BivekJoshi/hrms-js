import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useGetDepartment } from '../../../hooks/department/useDepartment';
import useAddDepartmentHistoryForm from '../../../hooks/department/DepartmentForm/useAddDepartmentHistoryForm';

const AddDepartmentHistoryFields = ({ onClose, isLoading, id }) => {
  const { formik } = useAddDepartmentHistoryForm(onClose, id);
  const { data: departmentData } = useGetDepartment();

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      // onClose();
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="departmentId"
            name="departmentId"
            label="Department Name"
            placeholder="Enter Department name"
            fullWidth
            required
            select
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
            }
            helperText={formik.touched.departmentId && formik.errors.departmentId}
            variant="outlined"
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
            // size="small"
          >
             <option value="" disabled>
              Select Branch
            </option>
            {departmentData?.map((option) => (
              <option key={option?.id} value={option?.id}>
                {`${option?.departmentName}`}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="effectiveFromDate"
            name="effectiveFromDate"
            label="Effective From Date"
            type="date"
            fullWidth
            required
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
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="effectiveToDate"
            name="effectiveToDate"
            label="Effective To Date"
            type="date"
            fullWidth
            required
            value={formik.values.effectiveToDate}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveToDate &&
              Boolean(formik.errors.effectiveToDate)
            }
            helperText={
              formik.touched.effectiveToDate && formik.errors.effectiveToDate
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="remarks"
            name="remarks"
            label="Remarks"
            placeholder="Enter remarks type"
            fullWidth
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Update Department
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default AddDepartmentHistoryFields;
