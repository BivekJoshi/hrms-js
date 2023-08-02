import { nanoid } from "nanoid";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import useDesignationForm from "../../../hooks/designation/DesignationForm/useDesignationForm";

const DesignationFields = ({ onClose, isLoading, data }) => {
  const { formik } = useDesignationForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  const submitButtonText = data ? "Update Designation" : "Add Designation";

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="positionName"
            name="positionName"
            label="Designation Name"
            placeholder="Enter Designation name"
            fullWidth
            required
            value={formik.values.positionName}
            onChange={formik.handleChange}
            error={
              formik.touched.positionName && Boolean(formik.errors.positionName)
            }
            helperText={
              formik.touched.positionName && formik.errors.positionName
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="positionLevel"
            name="positionLevel"
            label="Designation Level"
            placeholder="Enter designation level"
            fullWidth
            required
            value={formik.values.positionLevel}
            onChange={formik.handleChange}
            error={
              formik.touched.positionLevel &&
              Boolean(formik.errors.positionLevel)
            }
            helperText={
              formik.touched.positionLevel && formik.errors.positionLevel
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="salary"
            name="salary"
            label="Salary"
            placeholder="Enter salary"
            fullWidth
            required
            type="number"
            value={formik.values.salary}
            onChange={formik.handleChange}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="positionDetails"
            name="positionDetails"
            label="Designation Details"
            placeholder="Enter designation details"
            fullWidth
            multiline
            rows={3}
            value={formik.values.positionDetails}
            onChange={formik.handleChange}
            error={
              formik.touched.positionDetails &&
              Boolean(formik.errors.positionDetails)
            }
            helperText={
              formik.touched.positionDetails && formik.errors.positionDetails
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
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
            sx={{ mt: 3, ml: 1 }}
          >
            {submitButtonText}
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
    )
  );
};

export default DesignationFields;