import React, { useContext } from "react";
import useProjectAssignTaskForm from "../../../../hooks/project/ProjectTask/ProjectTaskForm/useProjectAssignTaskForm";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useGetProjectEmployeeById } from "../../../../hooks/project/projectEmployee/useProjectEmployee";
import { useParams } from "react-router-dom";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";

const ProjectAssignTaskField = ({ onClose, data }) => {
  const { mode } = useContext(ThemeModeContext);

  const { formik } = useProjectAssignTaskForm({ data });
  const { id: projectTd } = useParams();

  const {
    data: projectData,
    isLoading: LoadingProjectEmployeeData,
  } = useGetProjectEmployeeById(projectTd);
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();

  const getEmployeeNameById = (employeeId) => {
    const employee = employeeData?.find((emp) => emp?.id === employeeId);
    const name = `${employee?.firstName} ${employee?.middleName || ""} ${
      employee?.lastName
    }`;
    return name;
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <b>Assign Task</b>
        <p>{data?.name}</p>

        <b>Details</b>
        <p>{data?.detail}</p>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="projectEmployeeId "
          name="projectEmployeeId "
          select
          label="Assign Task To"
          placeholder="Select Employee"
          fullWidth
          required
          value={!LoadingProjectEmployeeData && formik.values.projectEmployeeId}
          onChange={formik.handleChange}
          error={
            formik.touched.projectEmployeeId &&
            Boolean(formik.errors.projectEmployeeId)
          }
          helperText={
            formik.touched.projectEmployeeId && formik.errors.projectEmployeeId
          }
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
          {!LoadingProjectEmployeeData &&
            (!loadingEmployee &&
              projectData.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                >
                  {getEmployeeNameById(option.empId)}
                </MenuItem>
              )))}
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
