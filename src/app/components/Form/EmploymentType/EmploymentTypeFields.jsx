import { Grid, TextField, Button, MenuItem } from "@mui/material";
import React from "react";
import useEmploymentTypeForm from "../../../hooks/employmentType/EmploymentTypeForm/useEmploymentTypeForm";
import RemarkField from "../../RemarkField/RemarkField";

const EmploymentTypeFields = ({ onClose, isLoading, data }) => {
  const { formik } = useEmploymentTypeForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const submitButtonText = data
    ? "Update Employment Type"
    : "Add Employment Type";

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
            label="Employment Type name"
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.name) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <RemarkField
            id="description"
            name="description"
            label="Description"
            fullWidth
            formik={formik}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.description),
            }}
            rows={4}
            inputProps={{ maxLength: 255 }}
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
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
          >
            {submitButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default EmploymentTypeFields;
