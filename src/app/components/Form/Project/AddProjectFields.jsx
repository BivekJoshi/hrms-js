import { Grid, Button, TextField, MenuItem, Autocomplete } from "@mui/material";
import React, { useContext } from "react";
import useAddProjectForm from "../../../hooks/project/addProject/useAddProjectForm";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useGetCompany } from "../../../hooks/company/useCompany";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { ButtonComponent } from '../../Button/ButtonComponent';

const projectOptions = [
  // {
  //   value: "WORK_IN_PROGRESS",
  //   label: "Work in progress",
  //   id: 1,
  // },
  {
    value: "COMPLETED",
    label: "Completed",
    id: 2,
  },
  // {
  //   value: "DELAYED",
  //   label: "Delayed",
  //   id: 3,
  // },
  // {
  //   value: "PENDING",
  //   label: "Pending",
  //   id: 4,
  // },
];

const AddprojectFields = ({ onClose, isLoading }) => {
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();
  const { mode } = useContext(ThemeModeContext);

  const { formik } = useAddProjectForm();

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
      if (formik.isValid) {
        onClose();
      }
    }
  };

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
            
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="endDate"
            label="Deadline Date"
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

        {/* <Grid item xs={12} sm={6}>
          <TextField
            name="taskStatus"
            label="Project Status"
            fullWidth
            select
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
        </Grid> */}

        <Grid item xs={12} sm={12}>
          {/* <TextField
            id="projectLeadId"
            name="projectLeadId"
            select
            required
            label="Assign a Project Leader."
            placeholder="Enter project Leader"
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
                <MenuItem
                  key={option?.id}
                  value={option?.id}
                  sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                >
                  {option?.firstName} {option?.middleName} {option?.lastName}
                </MenuItem>
              ))}
          </TextField>
           */}
          <Autocomplete
            id="projectLeadId"
            name="projectLeadId"
            options={employeeData || []}
            getOptionLabel={(employee) =>
              `${employee?.firstName} ${employee?.middleName} ${employee?.lastName}`
            }
            value={employeeData?.find(
              (employee) => employee?.id === formik.values?.employeeId
            )}
            onChange={(event, selectedEmployee) => {
              if (selectedEmployee) {
                formik.setFieldValue("projectLeadId", selectedEmployee.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User Name"
                placeholder="Enter User name..."
                fullWidth
                required
                variant="outlined"
                
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
              />
            )}
          />
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
            
            InputLabelProps={{ shrink: true }}
          >
            {!loadingCompany &&
              companyData.map((option) => (
                <MenuItem
                  key={option?.id}
                  value={option?.id}
                  sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                >
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
          <ButtonComponent
            variant="contained"
            OnClick={handleFormSubmit}
            TextColor={"#fff"}
            sx={{ mt: 3, ml: 1 }}
            buttonName={"Add Project"}
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

export default AddprojectFields;
