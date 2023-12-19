import { Grid, Button, TextField } from "@mui/material";
import React from "react";
import { useRemoveActiveProject, useAddActiveProject } from "../../../hooks/project/addProject/useAddProjectActiveForm";
import { useGetDeactivatedProject } from "../../../hooks/project/useProject";
import { ButtonComponent } from '../../Button/ButtonComponent';

export const EditProjectDeactivateFields = ({ onClose, isLoading, data }) => {

  const { formik } = useRemoveActiveProject(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        projectId: true,
      });
      onClose();
    }
  };

  const getProjectName = (projectId) => {
    if (data && data?.id === projectId) {
      return data?.projectName
    } return projectId
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
            value={getProjectName(formik.values.projectId)}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
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
          <ButtonComponent
            variant="contained"
            OnClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
            buttonName={"Terminate Project"}
          />
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

export const EditProjectActivateFields = ({ onClose, isLoading, data }) => {
  const { data: projectData } = useGetDeactivatedProject();
  const { formik } = useAddActiveProject(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        projectId: true,
      });
      onClose();
    }
  };

  const getProjectName = (projectId) => {
    return (
      projectData?.find((project) => project?.id === projectId)
        ?.projectName || projectId
    )
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
            value={getProjectName(formik.values.projectId)}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
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
          <ButtonComponent
          variant="contained"
          OnClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
          buttonName={"Activate Project"}
          />
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