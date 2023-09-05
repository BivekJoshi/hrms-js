import { Grid, TextField, Button, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import useEditProjectForm from "../../../hooks/project/editProject/useEditProjectForm";
import { useGetCompany } from "../../../hooks/company/useCompany";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const EditProjectFields = ({ onClose, isLoading, data }) => {
  const { formik } = useEditProjectForm(data);
  const { data: employeeData } = useGetEmployee();
  const { data: companyData } = useGetCompany();
  const { mode } = useContext(ThemeModeContext);

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
      onClose();
    } else {
      toast.error("please fill all the required fields");
    }
  };

  const getProjectLeaderName = (projectLeadId) => {
    const projectLeader = employeeData?.find(
      (employee) => employee.id == projectLeadId
    );
    if (projectLeader) {
      const { firstName, middleName, lastName } = projectLeader;
      return `${firstName} ${middleName} ${lastName}`;
    }
    return projectLeadId;
  };

  const getCompanyName = (associateCompanies) => {
    return (
      companyData?.find((company) => company.id == associateCompanies)
        ?.companyName || associateCompanies
    );
  };

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

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="projectName"
            name="projectName"
            label="Project Name"
            placeholder="enter project name"
            fullWidth
            required
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={
              formik.touched.projectName && Boolean(formik.errors.projectName)
            }
            helperText={formik.touched.projectName && formik.errors.projectName}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="startDate"
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="taskStatus"
            select
            name="taskStatus"
            label="Project Status"
            placeholder="enter project status"
            fullWidth
            required
            value={formik.values.taskStatus}
            onChange={formik.handleChange}
            error={
              formik.touched.taskStatus && Boolean(formik.errors.taskStatus)
            }
            helperText={formik.touched.taskStatus && formik.errors.taskStatus}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {projectOptions?.map((option) => (
              <MenuItem
                key={option?.id}
                value={option?.value}
                sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
              >
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="ProjectLeadId"
            name="ProjectLeadId"
            label="Assign a Project Leader"
            placeholder="Enter ProjectLeadId"
            fullWidth
            required
            value={getProjectLeaderName(formik.values.projectLeadId)}
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
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="companyId"
            name="companyId"
            label="Company Name"
            placeholder="enter companyId"
            disabled
            fullWidth
            value={getCompanyName(formik.values.companyId)}
            onChange={formik.handleChange}
            error={formik.touched.companyId && Boolean(formik.errors.companyId)}
            helperText={formik.touched.companyId && formik.errors.companyId}
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
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Update Project
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

export default EditProjectFields;
