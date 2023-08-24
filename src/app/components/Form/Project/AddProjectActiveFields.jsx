import { Grid, Button, TextField, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { useGetDeactivatedProject } from "../../../hooks/project/useProject";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const AddprojectFields = ({ onClose, isLoading }) => {
  const { data: projectData, isLoading: loadingProject } =
    useGetDeactivatedProject();
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
    onClose();
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            name="projectId"
            select
            label="Project LEADING ID"
            placeholder="Enter project Id"
            fullWidth
            value={formik.values.projectId}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {!loadingProject &&
              projectData.map((option) => (
                <MenuItem
                  key={option?.id}
                  value={option?.id}
                  sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                >
                  {option?.projectName}
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
            Activate Project
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default AddprojectFields;
