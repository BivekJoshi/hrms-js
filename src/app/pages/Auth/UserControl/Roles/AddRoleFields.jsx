import React, { useContext } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { useRoleForm } from "../../../../hooks/auth/roles/RoleForm/useRoleForm";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";
import { ButtonComponent } from '../../../../components/Button/ButtonComponent';

const roleStatus = [
  {
    value: "ROLE_SUPER_ADMIN",
    label: "Super Admin",
  },
  {
    value: "ROLE_MANAGER",
    label: "Manager",
  },
  {
    value: "ROLE_ADMIN",
    label: "Admin",
  },
  {
    value: "ROLE__HR_ADMIN",
    label: "HR Admin",
  },
  {
    value: "ROLE_HR_CLERK",
    label: "HR Clerk",
  },
  {
    value: "ROLE_EMPLOYEE",
    label: "Employee",
  },
];
export const AddRoleFields = ({ onClose,isLoading,data }) => {
  const { mode } = useContext(ThemeModeContext);
  const { formik } = useRoleForm(data);

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
      if (formik.isValid) {
        onClose();
      }
    }
  };
  const submitButtonText = data ? "Update Role" : "Add Role";

  return (
    !isLoading&&(
      <Grid container spacing={3}>

        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
            select
            label="Role Name"
            placeholder="Enter role you want to add..."
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
             {roleStatus.map((option) => (
              <MenuItem
                key={option?.value}
                value={option?.value}
                sx={mode === "light" ? "" : { bgcolor: "#0B0E10" }}
              >
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
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
            // sx={{ mt: 3, ml: 1 }}
            buttonName={submitButtonText}
          />
          <ButtonComponent
            variant="contained"
            OnClick={onClose}
            // sx={{ mt: 3, ml: 1 }}
            BGColor={"#d32f2f"}
            buttonName={"Cancel"}
          />
        </Grid>
      </Grid>
    )
  );
};