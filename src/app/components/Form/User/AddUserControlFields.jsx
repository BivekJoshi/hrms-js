import React, { useContext } from "react";
import { Grid, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import {
  useGetEmployee,
  useGetNoneUser,
} from "../../../hooks/employee/useEmployee";
import { useAddUserControlForm } from "../../../pages/Auth/UserControl/Users/useAddUserControlForm";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { ButtonComponent } from "../../Button/ButtonComponent";

export const AddUserControlFields = ({ onClose, userControlData }) => {
  const { data: employeeData } = useGetNoneUser();
  const { formik } = useAddUserControlForm(onClose);
  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
    }
  };

  const handleUserNameChange = (event, selectedEmployee) => {
    if (selectedEmployee) {
      formik.setFieldValue("employeeId", selectedEmployee.id);
      formik.setFieldValue("email", selectedEmployee.officeEmail);
    }
  };

  const nameLabel = (emp) => {
    if (emp?.middleName === "") {
      return `${emp?.firstName} ${emp?.lastName} (${emp?.positionName})`;
    } else {
      return `${emp?.firstName} ${emp?.middleName} ${emp?.lastName} (${emp?.positionName})`;
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography sx={{ color: "orange" }}>
            To add an employee, user's permanent address detail must be Filled
          </Typography>
          <br />
          <Autocomplete
            id="employeeId"
            name="employeeId"
            options={employeeData || []}
            getOptionLabel={(employee) => {
              return nameLabel(employee);
            }}
            value={employeeData?.find(
              (employee) => employee?.id === formik.values?.employeeId
            )}
            onChange={handleUserNameChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User Name"
                placeholder="Enter User name"
                fullWidth
                required
                variant="outlined"
                size="small"
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
            id="email"
            name="email"
            label="Email"
            placeholder="Enter email..."
            type="email"
            fullWidth
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            size="small"
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
            buttonName={"Add User"}
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
    </>
  );
};
