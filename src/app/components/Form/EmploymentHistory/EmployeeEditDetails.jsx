import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import useEditEmployeeDetails from "../../../hooks/employee/useEmployeeDetailsEdit";

const EmployeeEditFields = ({ onClose,tableId }) => {
  const { formik } = useEditEmployeeDetails(onClose, tableId);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="effectiveDateTo"
            name="effectiveDateTo"
            label="Effective To Date"
            type="date"
            fullWidth
            value={formik.values.effectiveDateTo}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveDateTo &&
              Boolean(formik.errors.effectiveDateTo)
            }
            helperText={
              formik.touched.effectiveDateTo && formik.errors.effectiveDateTo
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
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
          Update
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
  );
};

export default EmployeeEditFields;
