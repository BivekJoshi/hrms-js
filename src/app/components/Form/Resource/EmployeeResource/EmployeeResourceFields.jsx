import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React from "react";
import useEmployeeResourceForm from "../../../../hooks/resource/employeeResource/useEmployeeResourceForm";
import { useGetOfficeResource } from "../../../../hooks/resource/officeResource/useOfficeResource";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";

const EmployeeResourceFields = ({ onClose, isLoading, data }) => {
  const { data: officeResourceData } = useGetOfficeResource();
  const { data: employeeData } = useGetEmployee();

  const { formik } = useEmployeeResourceForm(data);
  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };
  const submitButtonText = data ? "Update Resource" : " Add Resource";
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="officeResourceId"
            name="officeResourceId"
            label="Office Resource"
            placeholder="Select Resource"
            fullWidth
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
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {officeResourceData &&
              officeResourceData.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            select
            id="employeeId"
            name="employeeId"
            label="Employee Name"
            placeholder="Select employee name"
            fullWidth
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {employeeData &&
              employeeData.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.firstName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            type="date"
            id="receiveDate"
            name="receiveDate"
            label="Received Date"
            placeholder="Select date"
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
            type="date"
            id="returnDate"
            name="returnDate"
            label="Returned Date"
            placeholder="Select date"
            fullWidth
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            error={
              formik.touched.returnDate && Boolean(formik.errors.returnDate)
            }
            helperText={formik.touched.returnDate && formik.errors.returnDate}
            variant="outlined"
            autoFocus
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
            {submitButtonText}
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

export default EmployeeResourceFields;
