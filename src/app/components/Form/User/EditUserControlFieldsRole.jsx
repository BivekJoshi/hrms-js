import React from "react";
import { Grid, TextField, Button, Autocomplete } from "@mui/material";
import { useEditUserControlForm } from "../../../pages/Auth/UserControl/Users/useEditUserControlForm";
import { useGetUserRole } from "../../../hooks/auth/userControl/useUserControl";
import { ButtonComponent } from '../../Button/ButtonComponent';

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

export const EditUserControlFieldsRole = ({ onClose, rowData }) => {
  const { data: userRoleData } = useGetUserRole();
  const { formik } = useEditUserControlForm({ rowData });

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
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <p>{rowData?.name}</p>
      </Grid>

      <Grid item xs={12} sm={12}>
        <Autocomplete
          id="roleId"
          name="roleId"
          options={userRoleData || []}
          getOptionLabel={(option) => getRoleLabel(option.id)}
          value={
            userRoleData?.find((role) => role.id === formik.values.roleId) ||
            null
          }
          onChange={(event, newValue) => {
            formik.setFieldValue("roleId", newValue ? newValue.id : null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Role"
              fullWidth
              required
              error={formik.touched.roleId && Boolean(formik.errors.roleId)}
              helperText={formik.touched.roleId && formik.errors.roleId}
              variant="outlined"
              size="small"
            />
          )}
        />
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        gap={1}
        mt={2}
      >
        <ButtonComponent
          variant="contained"
          OnClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
          buttonName={"Update Role"}
        />
        <ButtonComponent
          variant="contained"
          OnClick={onClose}
          sx={{ mt: 3, ml: 1 }}
          BGColor="red"
          buttonName={"Cancel"}
        />
      </Grid>
    </Grid>
  );
};
