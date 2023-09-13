import React from "react";
import useProjectAssignTaskForm from "../../../../hooks/project/ProjectTask/ProjectTaskForm/useProjectAssignTaskForm";
import { Button, Grid, MenuItem, TextField } from "@mui/material";

const ProjectAssignTaskField = ({ onClose, id, data }) => {
  console.log(data);
  const { formik } = useProjectAssignTaskForm({ id });

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  const {
    data: employeeData,
    isLoading: loadingEmployee,
  } = useGetDepartment();

  return (
    <Grid container spacing={3}>
      <Grid item>
        <b>Assign Task</b>
        <p>{data?.name}</p>

        <b>Details</b>
        <p>{data?.detail}</p>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectEmployeeId"
            name="projectEmployeeId"
            select
            label="Assign To"
            placeholder="Select employee"
            fullWidth
            required
            value={!loadingEmployee && formik.values.projectEmployeeId}
            onChange={formik.handleChange}
            error={
              formik.touched.projectEmployeeId &&
              Boolean(formik.errors.projectEmployeeId)
            }
            helperText={
              formik.touched.projectEmployeeId &&
              formik.errors.projectEmployeeId
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingEmployee &&
              employeeData.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                >
                  {option.employeename}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
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
          Assign Task
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

export default ProjectAssignTaskField;
