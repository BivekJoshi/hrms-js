import { Grid, Button, TextField, MenuItem, Autocomplete } from "@mui/material";
import React, { useContext } from "react";
import { useGetEmployee } from "../../../../hooks/employee/useEmployee";
import {
  useProjectEmployeeForm,
} from "../../../../hooks/project/projectEmployee/addProjectEmployee/useAddProjectEmployeeForm";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";
import { ButtonComponent } from "../../../Button/ButtonComponent";

export const AddprojectEmployeeFields = ( onClose, isLoading ) => {
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployee();

  const { mode } = useContext(ThemeModeContext);
  const { formik } = useProjectEmployeeForm(onClose);

  const handleFormSubmit = () => {
    if(formik.isValid){
      formik.handleSubmit();
    }

    // if (formik.isValid) {
    //   formik.setTouched({
    //     assignedOn: true,
    //     deAssignedOn: true,
    //     employeeId: true,
    //     projectId: true,
    //   });
    //   onClose();
    // }
  };

  return (
    !loadingEmployee && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="employeeId"
            name="employeeId"
            options={employeeData}
            getOptionLabel={(option) =>
              `${option?.firstName} ${option.middleName || ""} ${
                option?.lastName
              }`
            }
            value={
              employeeData && employeeData.find(
                (employee) => employee.id === formik.values.employeeId
              ) || null
            }
            onChange={(event, newValue) => {
              formik.setFieldValue("employeeId", newValue?.id || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee Name"
                placeholder="Enter Employee Name"
                fullWidth
                error={
                  formik.touched.employeeId && Boolean(formik.errors.employeeId)
                }
                helperText={
                  formik.touched.employeeId && formik.errors.employeeId
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        {/* <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            select
            name="projectId"
            label="Project Name"
            placeholder="Enter Project Name"
            fullWidth
            value={formik.values.projectDataById?.id}
            onChange={formik.handleChange}
            error={formik.touched.projectId && Boolean(formik.errors.projectId)}
            helperText={formik.touched.projectId && formik.errors.projectId}
            variant="outlined"
            
            InputLabelProps={{ shrink: true }}
          >
            {
              <MenuItem value={projectDataById?.id}>
                {projectDataById?.projectName}
              </MenuItem>
            }
          </TextField>
        </Grid> */}
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          gap={1}
          mt={2}
        >
          <ButtonComponent
            variant="contained"
            OnClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
            buttonName={"Add Employee"}
          />

          <ButtonComponent
            variant="contained"
            OnClick={onClose}
            sx={{ mt: 3, ml: 1, bgcolor: "red" }}
            BGColor={"#d32f2f"}
            buttonName={"Cancel"}
          />
        </Grid>
      </Grid>
    )
  );
};

export const EditProjectEmployeeFields = ({ data, onClose, isLoading }) => {
  const { formik } = useProjectEmployeeForm(data, onClose);
  // console.log(data);
  const handleFormSubmit = () => {
    if(formik.isValid){
      formik.handleSubmit();
    }

    // if (formik.isValid) {
    //   formik.setTouched({
    //     assignedOn: true,
    //     deAssignedOn: true,
    //     employeeId: true,
    //     projectId: true,
    //   });
    //   onClose();
    // }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <TextField
            id="employeeId"
            name="employeeId"
            
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
            InputLabelProps={{ shrink: true }}
          /> */}
          <TextField
            id="employeeId"
            name="employeeId"
            // select
            label="Employee Name"
            // placeholder="Enter Employee Name"
            fullWidth
            disabled
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeName && Boolean(formik.errors.employeeName)
            }
            helperText={formik.touched.employeeName && formik.errors.employeeName}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="projectId"
            // select
            name="projectId"
            label="Project Name"
            placeholder="Enter Project Name"
            fullWidth
            disabled
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={formik.touched.projectName && Boolean(formik.errors.projectName)}
            helperText={formik.touched.projectName && formik.errors.projectName}
            variant="outlined"
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
            sx={{ mt: 3, ml: 1, color: "#fff" }}
            buttonName={"Edit Project"}
          />
          <ButtonComponent
            variant="contained"
            OnClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            BGColor={"#d32f2f"}
            buttonName={"Cancel"}
          />
        </Grid>
      </Grid>
    )
  );
};
