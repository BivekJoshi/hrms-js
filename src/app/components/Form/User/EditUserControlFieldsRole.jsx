import React, { useContext } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useEditUserControlForm } from "../../../pages/Auth/UserControl/Users/useEditUserControlForm";
import { useGetUserControl, useGetUserRole } from "../../../hooks/auth/userControl/useUserControl";

const roleType = [
  {
    name: "ROLE_SUPER_ADMIN",
    label: "Super Admin",
    id: 1,
  },
  {
    name: "ROLE_ADMIN",
    label: "Admin",
    id: 2,
  },
  {
    name: "ROLE_MANAGER",
    label: "Manager",
    id: 3,
  },
  {
    name: "ROLE_HR_ADMIN",
    label: "HR Admin",
    id: 4,
  },
  {
    name: "ROLE_HR_CLERK",
    label: "HR Clerk",
    id: 5,
  },
  {
    name: "ROLE_EMPLOYEE",
    label: "Employee",
    id: 6,
  },
];

export const EditUserControlFieldsRole = ({ onClose ,rowData}) => {
  const { data: userData } = useGetUserControl();
  const { data: userRoleData } = useGetUserRole();

  const { formik } = useEditUserControlForm({rowData});
  const { mode } = useContext(ThemeModeContext);

  const getRoleLabel = (roleId) => {
    const role = roleType?.find((r) => r?.id === roleId);
    return role ? role?.label : "";
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
        {/* <TextField
          id="rowData?.id"
          name="userId"
          label="User Name"
          placeholder="Enter User name..."
          fullWidth
          required
          select
          value={formik.values.userId}
          // onChange={handleUserNameChange}
          error={formik.touched.userId && Boolean(formik.errors.userId)}
          helperText={formik.touched.userId && formik.errors.userId}
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
        </TextField> */}
        <p>{rowData?.name}</p>
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
              <MenuItem
                key={role?.id}
                value={role?.id}
                sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
              >
                {getRoleLabel(role?.id)}
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
          Update
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
