import { Grid, Button, Typography, Divider, TextField } from "@mui/material";
import React from "react";
import {
  useRemoveActiveProject,
  useAddActiveProject,
} from "../../../hooks/project/addProject/useAddProjectActiveForm";
import { useGetDeactivatedProject } from "../../../hooks/project/useProject";
import Restore from "../../../../assets/restore.png";

export const EditProjectDeactivateFields = ({ onClose, isLoading, data }) => {
  const { formik } = useRemoveActiveProject(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();
    onClose();
  };

  const getProjectName = (projectId) => {
    if (data && data?.id === projectId) {
      return data?.projectName;
    }
    return projectId;
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} textAlign="center">
          <Typography varinat="h6" textAlign="center">
            Are you certain that you want to terminate this project?
          </Typography>
          <Typography variant="h7" textAlign="center">
            {getProjectName(formik.values.projectId)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} textAlign="center">
          <TextField
            id="remarks"
            name="remarks"
            label="Reason"
            placeholder="Give reason "
            fullWidth
            // disabled
            value={getProjectName(formik.values.remarks)}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />{" "}
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
            Terminate Project
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

export const EditProjectActivateFields = ({ onClose, isLoading, data }) => {
  const { data: projectData } = useGetDeactivatedProject();
  const { formik } = useAddActiveProject(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
    // onClose();
  };

  const getProjectName = (projectId) => {
    return (
      projectData?.find((project) => project?.id === projectId)?.projectName ||
      projectId
    );
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography fontSize="20px" textAlign="center">
            Are you sure you want to activate this project?
          </Typography>
          <Typography fontSize="14px" textAlign="center" fontWeight={400}>
            Project Name : {getProjectName(formik.values.projectId)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} textAlign="center">
          <TextField
            id="remarks"
            name="remarks"
            label="Reason"
            placeholder="Give reason "
            fullWidth
            // disabled
            value={getProjectName(formik.values.remarks)}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>
        <Grid item xs={12} sm={12} textAlign="center">
          <img src={Restore} alt="Restore" />
        </Grid>
        <Grid item xs={12} sm={12} textAlign="center">
          <Divider sx={{ width: "100%" }} />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="28px"
        >
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
          >
            Activate Project
          </Button>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};
