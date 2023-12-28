import { Grid, TextField, Button, MenuItem, Autocomplete } from "@mui/material";
import React, { useContext } from "react";
import useEditProjectForm from "../../../hooks/project/editProject/useEditProjectForm";
// import { useGetCompany } from "../../../hooks/company/useCompany";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { ButtonComponent } from '../../Button/ButtonComponent';
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
// import { useGetProjectDetail } from "../../../hooks/project/useProject";

const EditProjectFields = ({ onClose, isLoading, data }) => {
 
  const { formik } = useEditProjectForm(data);
  // const { data: projectData } = useGetProjectDetail();
  const { data: employeeData } = useGetEmployee();
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
    onClose();
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

  // const getCompanyName = (associateCompanies) => {
  //   return (
  //     companyData?.find((company) => company.id == associateCompanies)
  //       ?.branchName || associateCompanies
  //   );
  // };

  const projectOptions = [
    // {
    //   value: "WORK_IN_PROGRESS",
    //   label: "Work in progress",
    //   id: 1,
    // },
    {
      value: 'COMPLETED',
      label: 'Completed',
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

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='projectName'
            name='projectName'
            label='Project Name'
            placeholder='enter project name'
            fullWidth
            required
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={
              formik.touched.projectName && Boolean(formik.errors.projectName)
            }
            helperText={formik.touched.projectName && formik.errors.projectName}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='startDate'
            name='startDate'
            label='Start Date'
            type='date'
            fullWidth
            required
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='endDate'
            name='endDate'
            label='End Date'
            type='date'
            fullWidth
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='taskStatus'
            select
            name='taskStatus'
            label='Project Status'
            placeholder='enter project status'
            fullWidth
            required
            value={formik.values.taskStatus}
            onChange={formik.handleChange}
            error={
              formik.touched.taskStatus && Boolean(formik.errors.taskStatus)
            }
            helperText={formik.touched.taskStatus && formik.errors.taskStatus}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          >
            {projectOptions?.map((option) => (
              <MenuItem
                key={option?.id}
                value={option?.value}
                sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
              >
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            id='projectLeadName'
            name='projectLeadName'
            label='Assign a Project Leader'
            placeholder='Enter ProjectLeadId'
            fullWidth
            disabled
            required
            value={formik.values.projectLeadName}
            onChange={formik.handleChange}
            error={
              formik.touched.projectLeadName &&
              Boolean(formik.errors.projectLeadName)
            }
            helperText={
              formik.touched.projectLeadName && formik.errors.projectLeadName
            }
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          /> */}
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
        {/* <Grid item xs={12} sm={12}>
          <TextField
            id='companyId'
            name='companyId'
            label='Company Name'
            placeholder='Enter branch'
            disabled
            fullWidth
            // value={getCompanyName(formik.values.branchId)}
            onChange={formik.handleChange}
            // error={formik.touched.branchId && Boolean(formik.errors.branchId)}
            // helperText={formik.touched.branchId && formik.errors.branchId}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <ButtonComponent
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
            buttonName={"Update Project"}
          />
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color='error'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditProjectFields;
