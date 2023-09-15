import React, { useContext } from "react";
import useProjectAssignTaskForm from "../../../../hooks/project/ProjectTask/ProjectTaskForm/useProjectAssignTaskForm";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useGetProjectEmployeeById } from "../../../../hooks/project/projectEmployee/useProjectEmployee";
import { useParams } from "react-router-dom";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";

const ProjectAssignTaskField = ({ onClose, id, data }) => {
  const { mode } = useContext(ThemeModeContext);

  const { formik } = useProjectAssignTaskForm({ data});
  const { id: projectTd } = useParams();

  const { data: projectData } = useGetProjectEmployeeById(projectTd);
  console.log(projectData, "Yesma employee ko Id use garnu xa malai");

  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  // const {
  //   data: employeeData,
  //   isLoading: loadingEmployee,
  // } = useGetDepartment();

  return (
    <Grid container spacing={3}>
      <Grid item>
        <b>Assign Task</b>
        <p>{data?.name}</p>

        <b>Details</b>
        <p>{data?.detail}</p>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectEmployeeId "
            name="projectEmployeeId "
            select
            label="Employee Name"
            placeholder="Enter Employyee Name"
            fullWidth
            value={formik.values.projectEmployeeId }
            onChange={formik.handleChange}
            error={
              formik.touched.projectEmployeeId  && Boolean(formik.errors.projectEmployeeId )
            }
            helperText={formik.touched.projectEmployeeId  && formik.errors.projectEmployeeId }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingEmployee &&
              employeeData
                .filter((employee) =>
                  projectData.some((project) => project.empId === employee.id)
                )
                .map((filteredOption) => (
                  <MenuItem
                    key={filteredOption?.id}
                    value={filteredOption?.id}
                    sx={mode === "light" ? "" : { bgcolor: "#413e3e" }}
                  >
                    {filteredOption?.firstName} {filteredOption?.middleName}{" "}
                    {filteredOption?.lastName}
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
