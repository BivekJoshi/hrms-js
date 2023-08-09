import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useRoleForm } from "../../../../hooks/auth/roles/RoleForm/useRoleForm";


export const AddRoleFields = ({ onClose,isLoading,data }) => {
  const { formik } = useRoleForm(data);

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
  const submitButtonText = data ? "Update Role" : "Add Role";

  return (
    !isLoading&&(
      <Grid container spacing={3}>

        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
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