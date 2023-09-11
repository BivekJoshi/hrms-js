import { Grid, Button, TextField, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useAddActiveEmployeeForm,
  useRemoveDeactiveEmployeeForm,
} from "../../../../hooks/employee/DeactivateEmploye/useRemoveDeactiveEmployeeForm";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import { useGetDeactivatedEmployee } from "../../../../hooks/employee/DeactivateEmploye/useEmployee";

export const EditEmployeeDeactivateFields = ({ onClose, isLoading, data }) => {
  const { data: employeeData } = useGetEmployee();

  const { formik } = useRemoveDeactiveEmployeeForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        employeeId: true,
        setActivation: true,
        effectiveDate: true,
      });
      onClose();
    } else {
      toast.error("please fill all the required fields");
    }
  };

  const options = [
    {
      value: "False",
      label: "Deactivate",
      id: 1,
    },
  ];

  const getEmployeeName = (employeeId) => {
    const employee = employeeData?.find(
      (employee) => employee?.id === employeeId
    );

    if (employee) {
      const { firstName, middleName, lastName } = employee;
      return `${firstName} ${middleName || ""} ${lastName || ""}`.trim();
    }

    return employeeId;
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="EmployeeId"
            name="EmployeeId"
            label="Employee Name"
            placeholder="Enter Employee Id"
            fullWidth
            value={getEmployeeName(formik.values.employeeId)}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            style={{ display: "none" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" component="h6">
            Do you really want to deactivate employee
            <b> {getEmployeeName(formik.values.employeeId)}</b>
          </Typography>
        </Grid>

        {/* <Grid item xs={12} sm={12}>
          <TextField
            id="setActivation"
            select
            name="setActivation"
            label="Employee Status"
            placeholder="Enter Employee staus"
            fullWidth
            value={formik.values.setActivation}
            onChange={formik.handleChange}
            error={formik.touched.setActivation && Boolean(formik.errors.setActivation)}
            helperText={formik.touched.setActivation && formik.errors.setActivation}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {
              options?.map((option) => (
                <MenuItem key={option?.id} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))
            }
          </TextField>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="effectiveDate"
            name="effectiveDate"
            label="Effective From Date"
            placeholder="Effective Date"
            type="date"
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
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid
          item xs={12} sm={12} md={12}
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
            Yes Proceed
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            No
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export const EditEmployeeActivateFields = ({ onClose, isLoading, id }) => {
  const { data: employeeData } = useGetDeactivatedEmployee();
  const { formik } = useAddActiveEmployeeForm(id);
  const options = [
    {
      value: "True",
      label: "Activate",
      id: 1,
    },
  ];

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        employeeId: true,
        setActivation: true,
        effectiveDate: true,
      });
      onClose();
    } else {
      toast.error("please fill all the required fields");
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employeeData?.find(
      (employee) => employee?.id === employeeId
    );

    if (employee) {
      const { firstName, middleName, lastName } = employee;
      return `${firstName} ${middleName || ""} ${lastName || ""}`.trim();
    }

    return employeeId;
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            name="projectId"
            label="Employee Name"
            placeholder="Enter project Id"
            fullWidth
            value={getEmployeeName(formik.values.employeeId)}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            style={{ display: "none" }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" component="h6">
            Do you really want to Activate employee
            <b> {getEmployeeName(formik.values.employeeId)}</b>
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <TextField
            id="setActivation"
            select
            name="setActivation"
            label="Employee Status"
            placeholder="Enter Employee staus"
            fullWidth
            value={formik.values.setActivation}
            onChange={formik.handleChange}
            error={
              formik.touched.setActivation &&
              Boolean(formik.errors.setActivation)
            }
            helperText={
              formik.touched.setActivation && formik.errors.setActivation
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {options?.map((option) => (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <TextField
            id="effectiveDate"
            name="effectiveDate"
            label="Effective From Date"
            placeholder="Effective Date"
            type="date"
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
            Yes Proceed
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
