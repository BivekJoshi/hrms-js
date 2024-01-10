import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import useDepartmentForm from "../../../hooks/department/DepartmentForm/useDepartmentForm";
import CustomButton from "../../../utils/Button/Button";

const DepartmentFields = ({ onClose, isLoading, data }) => {
  const { formik } = useDepartmentForm(data, onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const submitButtonText = data ? "Update Department" : "Add Department";
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="departmentName"
            name="departmentName"
            label="Department Name"
            fullWidth
            required
            value={formik.values.departmentName}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentName &&
              Boolean(formik.errors.departmentName)
            }
            helperText={
              formik.touched.departmentName && formik.errors.departmentName
            }
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.departmentName) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="departmentType"
            name="departmentType"
            label="Department Type"
            fullWidth
            required
            value={formik.values.departmentType}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentType &&
              Boolean(formik.errors.departmentType)
            }
            helperText={
              formik.touched.departmentType && formik.errors.departmentType
            }
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: Boolean(formik.values.departmentType) }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="departmentDescription"
            name="departmentDescription"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formik.values.departmentDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentDescription &&
              Boolean(formik.errors.departmentDescription)
            }
            helperText={
              formik.touched.departmentDescription &&
              formik.errors.departmentDescription
            }
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(formik.values.departmentDescription) }}
            inputProps={{ maxLength: 250 }}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <CustomButton
            text={submitButtonText}
            onClick={handleFormSubmit}
            type="success"
            style={{ mt: 3, ml: 1 }}
          />
          <CustomButton
            text={"Cancel"}
            onClick={onClose}
            type="error"
            style={{ mt: 3, ml: 1 }}
          />
        </Grid>
      </Grid>
    )
  );
};

export default DepartmentFields;
