import React, { useContext } from "react";
import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import useEditEventAttendanceForm from "../../../hooks/event/editEvent/useEditEventAttendanceForm";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import UpdateIcon from "@mui/icons-material/Update";

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
      label: "Present",
      value: "true",
    },
    {
      id: 2,
      label: "Absent",
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
                fullWidth
                error={
                  formik.touched.isPresent && Boolean(formik.errors.isPresent)
                }
                helperText={formik.touched.isPresent && formik.errors.isPresent}
                variant="outlined"
                size="small"
              />
            )}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          gap="1rem"
          marginTop="1rem"
        >
          <Button
            color="success"
            variant="contained"
            startIcon={<UpdateIcon />}
            onClick={handleFormSubmit}
          >
            Update
          </Button>
          <Button color="error" variant="contained" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EditEventAttendanceFields;
