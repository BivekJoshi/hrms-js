import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useGetNoneUser } from "../../../hooks/employee/useEmployee";
import { useAddUserControlForm } from "../../../pages/Auth/UserControl/Users/useAddUserControlForm";
import { ButtonComponent } from "../../Button/ButtonComponent";
import renderOptions from "../../../utils/renderOptions";

export const AddUserControlFields = ({ onClose }) => {
  const { data: employeeData } = useGetNoneUser();
  const { formik } = useAddUserControlForm(onClose);
  const [employeeSelected, setEmployeeSelected] = useState(true);

  const handleFormSubmit = () => {
    if (formik.dirty === false) {
      return setEmployeeSelected(false);
    } else if (formik.dirty === true) {
      formik.handleSubmit();
      if (formik.isValid) {
      }
    }
  };

  // console.log({"employeeData": employeeData})
  const handleEmployeeChange = (event, selectedEmployee) => {
    if (selectedEmployee) {
      formik.setFieldValue("employeeId", selectedEmployee.id);
      formik.setFieldValue("email", selectedEmployee.email);
      setEmployeeSelected(true); // Reset the error status
    } else {
      formik.setFieldValue("employeeId", "");
      formik.setFieldValue("email", "");
      setEmployeeSelected(false); // Set the error status
    }
  };

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <br />
          <Autocomplete
            id="employeeId"
            name="employeeId"
            options={employeeData || []}
            getOptionLabel={(option) => option?.label}
            value={employeeData?.find(
              (employee) => employee?.id === formik?.values?.employeeId
            )}
            onChange={handleEmployeeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User Name"
                fullWidth
                required
                variant="outlined"
                size="small"
                error={!employeeSelected}
                helperText={
                  (!employeeSelected && "Please select an employee") ||
                  (formik.touched.employeeId && formik.errors.employeeId)
                }
              />
            )}
            renderOption={(props, option) =>
              renderOptions(props, option, `label`)
            }
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(formik.values.email) }}
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
    </Grid>
  );
};
