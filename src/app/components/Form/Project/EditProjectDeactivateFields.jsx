import { Grid, Button, TextField, Checkbox } from "@mui/material";
import React, { useState } from "react";
import useAddProjectActiveForm from "../../../hooks/project/addProject/useAddProjectActiveForm";
import { pink } from "@mui/material/colors";
import useRemoveActiveProject from "../../../hooks/project/addProject/useAddProjectActiveForm";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { toast } from "react-toastify";

const EditProjectDeactivateFields = ({ onClose, isLoading, data }) => {
  const { formik } = useRemoveActiveProject(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        projectId: true,
        isActive: true,
      });
      onClose();
    } else {
      toast.error("please fill all the required fields");
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            name="projectId"
            label="Project Name"
            placeholder="Enter project Id"
            fullWidth
            value={formik.values.projectId}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="isActive"
            name="isActive"
            label="active"
            placeholder="Enter project Id"
            fullWidth
            value={formik.values.isActive}
            onChange={formik.handleChange}
            error={formik.touched.isActive && Boolean(formik.errors.isActive)}
            helperText={formik.touched.isActive && formik.errors.isActive}
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
            variant="container"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            De Activate Project
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditProjectDeactivateFields;
