import { Grid, Button, TextField, MenuItem, Autocomplete } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import useAddProjectForm from "../../../hooks/project/addProject/useAddProjectForm";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetCompany } from "../../../hooks/company/useCompany";

const projectOptions = [
  {
    value: "WORK_IN_PROGRESS",
    label: "Work in progress",
    id: 1,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    id: 2,
  },
  {
    value: "DELAYED",
    label: "Delayed",
    id: 3,
  },
  {
    value: "PENDING",
    label: "Pending",
    id: 4,
  },
];

const AddprojectFields = ({ onClose, isLoading }) => {
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();

  const { formik } = useAddProjectForm();

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        projectName: true,
        startDate: true,
        endDate: true,
        taskStatus: true,
        projectLeadId: true,
        companyId: true,
      });
    } else {
      toast.error('Please make sure you have filled the form correctly');
    };
  }

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectName"
            name="projectName"
            label="Project Name"
            placeholder="Enter project name"
            fullWidth
            required
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={
              formik.touched.projectName && Boolean(formik.errors.projectName)
            }
            helperText={formik.touched.projectName && formik.errors.projectName}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            required
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="taskStatus"
            label="Task Status"
            fullWidth
            select
            required
            value={formik.values.taskStatus}
            onChange={formik.handleChange}
            error={formik.touched.taskStatus && Boolean(formik.errors.taskStatus)}
            helperText={formik.touched.taskStatus && formik.errors.taskStatus}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {projectOptions?.map((option) => (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="projectLeadId"
            name="projectLeadId"
            select
            required
            label="Assign a Project Leader."
            placeholder="Enter project Id"
            fullWidth
            value={formik.values.projectLeadId}
            onChange={formik.handleChange}
            error={
              formik.touched.projectLeadId &&
              Boolean(formik.errors.projectLeadId)
            }
            helperText={
              formik.touched.projectLeadId && formik.errors.projectLeadId
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {!loadingEmployee &&
              employeeData.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.firstName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="companyId"
            name="companyId"
            select
            label="Project Company Name"
            placeholder="Enter Company Id"
            fullWidth
            required
            value={formik.values.companyId}
            onChange={formik.handleChange}
            error={formik.touched.companyId && Boolean(formik.errors.companyId)}
            helperText={formik.touched.companyId && formik.errors.companyId}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingCompany &&
              companyData.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.companyName}
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
            Add Project
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default AddprojectFields;
