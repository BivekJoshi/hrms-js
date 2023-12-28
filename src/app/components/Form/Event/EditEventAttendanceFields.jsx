import React, { useContext } from "react";
import {
  Autocomplete,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonComponent } from "../../Button/ButtonComponent";
import useEditEventAttendanceForm from "../../../hooks/event/editEvent/useEditEventAttendanceForm";
import ThemeModeContext from '../../../../theme/ThemeModeContext';

const EditEventAttendanceFields = ({ onClose, isLoading, data }) => {
  const { palette } = useContext(ThemeModeContext);
  const { formik } = useEditEventAttendanceForm(data, onClose);
 
  const handleFormSubmit = async () => {
    // const isValid = await formik.validateForm();
    formik.handleSubmit();
    if (formik.isValid) {
      
    }
  };

  const statusOption = [
    {
      id: 1,
      label: "present",
      value: "true",
    },
    {
      id: 2,
      label: "absent",
      value: "false",
    },
  ];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography>
            Do you really want to change event attending status of{" "}
            <span style={{ fontSize: "1rem", fontWeight: "600" }}>
              {data?.userName}
            </span>{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="isPresent"
            name="isPresent"
            options={statusOption || []}
            getOptionLabel={(option) => option?.label || ""}
            value={statusOption.find(
              (option) => option?.value === formik.values.isPresent
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue("isPresent", newValue?.value || "");
            }}
            renderOption={(props, option) => (
              <MenuItem
                {...props}
                style={{
                  backgroundColor:
                    palette?.mode === "light"
                      ? palette.background.paper
                      : palette.background.default,
                }}
              >
                {option.label}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Attend status"
                placeholder="Enter Employee Status"
                fullWidth
                error={
                  formik.touched.isPresent && Boolean(formik.errors.isPresent)
                }
                helperText={formik.touched.isPresent && formik.errors.isPresent}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
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
            buttonName={"Update Event"}
          />
          <ButtonComponent
            variant="contained"
            OnClick={onClose}
            BGColor={"#d32f2f"}
            buttonName={"Cancel"}
          />
        </Grid>
      </Grid>
    )
  );
};

export default EditEventAttendanceFields;
