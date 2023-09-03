import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, Button, MenuItem, Autocomplete } from "@mui/material";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetUserRole } from "../../../hooks/auth/userControl/useUserControl";
import { useAddUserControlForm } from "../../../pages/Auth/UserControl/Users/useAddUserControlForm";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const AddUserControlFields = ({ onClose }) => {
  const { data: employeeData } = useGetEmployee();
  const { formik } = useAddUserControlForm();
  const { mode } = useContext(ThemeModeContext);

  const handleUserNameChange = (event) => {
    if (selectedEmployee) {}
    const selectedUserId = event.target.value;
    const selectedEmployee = employeeData.find(
      (employee) => employee?.id === selectedUserId
    );
    const selectedEmployeeEmail = selectedEmployee
      ? selectedEmployee?.officeEmail
      : "";
    formik.setFieldValue("employeeId", selectedUserId);
    formik.setFieldValue("email", selectedEmployeeEmail);
  };

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
      if (formik.isValid) {
        onClose();
      } else {
        toast.error("Please make sure you have filled the form correctly");
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Autocomplete
        options={employeeData}
        onChange={handleUserNameChange}
        autoHighlight
        getOptionLabel={(option) => `${option?.firstName} ${option?.middleName} ${option?.lastName}`}
        
        renderInput={(params) => (
          <TextField
          {...params}
          label="Select Employee"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
            
          }}
          
          />
          

        )}
        />

        {/* <TextField
          id="employeeId"
          name="employeeId"
          label="User Name"
          placeholder="Enter User name..."
          fullWidth
          required
          select
          value={formik.values.employeeId}
          onChange={handleUserNameChange}
          error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
          helperText={formik.touched.employeeId && formik.errors.employeeId}
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
          {employeeData &&
            employeeData.map((employee) => (
              <MenuItem
                key={employee?.id}
                value={employee?.id}
                sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
              >
                {`${employee?.firstName} ${employee?.middleName} ${employee?.lastName}`}
              </MenuItem>
            ))}
        </TextField> */}
      </Grid>

      <Grid item xs={12} sm={12}>
        <TextField
          id="email"
          name="email"
          label="Email"
          placeholder="Enter email..."
          type="email"
          fullWidth
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
          Add User
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
  );
};
