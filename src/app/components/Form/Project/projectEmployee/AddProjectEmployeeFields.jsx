import { Grid, Button, TextField, MenuItem, Autocomplete } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import { useGetCompany } from "../../../../hooks/company/useCompany";
import {
  useAddProjectEmployee,
  useEditProjectEmployee,
  useGetProjectEmployeeById,
} from "../../../../hooks/project/projectEmployee/useProjectEmployee";
import { addProjectEmployee } from "../../../../api/project/projectEmployee-api";
import { useAddProjectEmployeeForm, useEditProjectEmployeeForm } from "../../../../hooks/project/projectEmployee/addProjectEmployee/useAddProjectEmployeeForm";
import {
  useGetProject,
  useGetProjectById,
} from "../../../../hooks/project/useProject";
import { useParams } from "react-router-dom";

export const AddprojectEmployeeFields = ({ onClose, isLoading }) => {
  const { id } = useParams();
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();
  const { data: projectData, isLoading: loadingProject } = useGetProject();
  const { data: projectDataById } = useGetProjectById(id);

  const { formik } = useAddProjectEmployeeForm();

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        assignedOn: true,
        deAssignedOn: true,
        employeeId: true,
        projectId: true,
      });
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="employeeId"
            name="employeeId"
            select
            label="Employee Name"
            placeholder="Enter Employyee Name"
            fullWidth
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingEmployee &&
              employeeData.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.firstName} {option?.middleName} {option?.lastName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            select
            name="projectId"
            label="Project Name"
            placeholder="Enter Project Name"
            fullWidth
            value={formik.values.projectId}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {
              <MenuItem value={projectDataById?.id}>
                {projectDataById?.projectName}
              </MenuItem>
            }
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="assignedOn"
            name="assignedOn"
            label="Assigned On"
            type="date"
            fullWidth
            value={formik.values.assignedOn}
            onChange={formik.handleChange}
            error={
              formik.touched.assignedOn && Boolean(formik.errors.assignedOn)
            }
            helperText={formik.touched.assignedOn && formik.errors.assignedOn}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="deAssignedOn"
            name="deAssignedOn"
            label="Deassigned On"
            type="date"
            fullWidth
            value={formik.values.deAssignedOn}
            onChange={formik.handleChange}
            error={
              formik.touched.deAssignedOn && Boolean(formik.errors.deAssignedOn)
            }
            helperText={
              formik.touched.deAssignedOn && formik.errors.deAssignedOn
            }
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
            Add Employee
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export const EditProjectEmployeeFields = ({ data, onClose, isLoading }) => {
  const { formik } = useEditProjectEmployeeForm(data);
 
  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        assignedOn: true,
        deAssignedOn: true,
        employeeId: true,
        projectId: true,
      });
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="employeeId"
            name="employeeId"
            select
            label="Employee Name"
            placeholder="Enter Employyee Name"
            fullWidth
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId && Boolean(formik.errors.employeeId)
            }
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            select
            name="projectId"
            label="Project Name"
            placeholder="Enter Project Name"
            fullWidth
            value={formik.values.projectId}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="assignedOn"
            name="assignedOn"
            label="Assigned On"
            type="date"
            fullWidth
            value={formik.values.assignedOn}
            onChange={formik.handleChange}
            error={
              formik.touched.assignedOn && Boolean(formik.errors.assignedOn)
            }
            helperText={formik.touched.assignedOn && formik.errors.assignedOn}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="deAssignedOn"
            name="deAssignedOn"
            label="Deassigned On"
            type="date"
            fullWidth
            value={formik.values.deAssignedOn}
            onChange={formik.handleChange}
            error={
              formik.touched.deAssignedOn && Boolean(formik.errors.deAssignedOn)
            }
            helperText={
              formik.touched.deAssignedOn && formik.errors.deAssignedOn
            }
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
            Edit Project
          </Button>
        </Grid>
      </Grid>
    )
  );
};
