import React from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import { useGetUserRole } from "../../../../hooks/auth/userControl/useUserControl";
import {
  useAddUserControlForm,
  useAddUserPermissionForm,
} from "./useAddUserControlForm";

export const AddUserControlFields = ({ onClose }) => {
  const { data: employeeData } = useGetEmployee();
  const { data: userRoleData } = useGetUserRole();
  const { formik } = useAddUserControlForm();

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

  const handleUserNameChange = (event) => {
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
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
              <MenuItem key={employee?.id} value={employee?.id}>
                {`${employee?.firstName} ${employee?.middleName} ${employee?.lastName}`}
              </MenuItem>
            ))}
        </TextField>
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

      <Grid item xs={12} sm={12}>
        <TextField
          id="roleId"
          name="roleId"
          label="Role"
          placeholder="Enter role..."
          fullWidth
          select
          required
          value={formik.values.roleId}
          onChange={formik.handleChange}
          error={formik.touched.roleId && Boolean(formik.errors.roleId)}
          helperText={formik.touched.roleId && formik.errors.roleId}
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
          {userRoleData &&
            userRoleData.map((role) => (
              <MenuItem key={role?.id} value={role?.id}>
                {role?.name}
              </MenuItem>
            ))}
        </TextField>
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

export const AddPermissionFields = ({ onClose }) => {
  const { data: userRoleData } = useGetUserRole();

  const { formik } = useAddUserPermissionForm();

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

  const addRole = [
    {
      id: 1,
      value: "true",
    },
    {
      id: 2,
      value: "false",
    },
  ]

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="userId"
            name="userId"
            label="userId"
            placeholder="Enter userId..."
            fullWidth
            required
            value={formik.values.userId}
            onChange={formik.handleChange}
            error={formik.touched.userId && Boolean(formik.errors.userId)}
            helperText={formik.touched.userId && formik.errors.userId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="roleId"
            name="roleId"
            label="Role"
            placeholder="Enter role..."
            fullWidth
            select
            required
            value={formik.values.roleId}
            onChange={formik.handleChange}
            error={formik.touched.roleId && Boolean(formik.errors.roleId)}
            helperText={formik.touched.roleId && formik.errors.roleId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {userRoleData &&
              userRoleData.map((role) => (
                <MenuItem key={role?.id} value={role?.id}>
                  {role?.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="addRole"
            name="addRole"
            label="addRole"
            placeholder="Enter addRole..."
            fullWidth
            select
            required
            value={formik.values.addRole}
            onChange={formik.handleChange}
            error={formik.touched.addRole && Boolean(formik.errors.addRole)}
            helperText={formik.touched.addRole && formik.errors.addRole}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {addRole &&
              addRole.map((role) => (
                <MenuItem key={role?.id} value={role?.value}>
                  {role?.value}
                </MenuItem>
              ))}
          </TextField>
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
            Add Permission
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
    </>
  );
};
