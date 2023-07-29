import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import useEmployeeResourceForm from "../../../../hooks/resource/employeeResource/useEmployeeResourceForm";

const EmployeeResourceFields = ({onClose,isLoading}) => {
  const {formik}=useEmployeeResourceForm();
  const handleFormSubmit = () => {

    formik.handleSubmit();

    if (formik.isValid) {
      onClose(); 
    } else {
      toast.error('Please make sure you have filled the form correctly');
    }
  };
  return (
    !isLoading &&(
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
          id="officeResourceId"
          name="officeResourceId"
          label="Position officeResourceId"
          placeholder="Enter position name"
          fullWidth
          value={formik.values.officeResourceId}
          onChange={formik.handleChange}
          error={
            formik.touched.officeResourceId &&
            Boolean(formik.errors.officeResourceId)
          }
          helperText={
            formik.touched.officeResourceId && formik.errors.officeResourceId
          }
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="employeeId"
          name="employeeId"
          label="Position employeeId"
          placeholder="Enter position employeeId"
          fullWidth
          value={formik.values.employeeId}
          onChange={formik.handleChange}
          error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
          helperText={formik.touched.employeeId && formik.errors.employeeId}
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="receiveDate"
          name="receiveDate"
          label="Position receiveDate"
          placeholder="Enter receiveDate name"
          fullWidth
          value={formik.values.receiveDate}
          onChange={formik.handleChange}
          error={
            formik.touched.receiveDate && Boolean(formik.errors.receiveDate)
          }
          helperText={formik.touched.receiveDate && formik.errors.receiveDate}
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="returnDate"
          name="returnDate"
          label="Position returnDate"
          placeholder="Enter position returnDate"
          fullWidth
          value={formik.values.returnDate}
          onChange={formik.handleChange}
          error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
          helperText={formik.touched.returnDate && formik.errors.returnDate}
          variant="outlined"
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
          <Button
            variant='contained'
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Add Resource
          </Button>
          <Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
            Cancel
          </Button>
        </Grid>
    </Grid>
    )
  );
};

export default EmployeeResourceFields;
