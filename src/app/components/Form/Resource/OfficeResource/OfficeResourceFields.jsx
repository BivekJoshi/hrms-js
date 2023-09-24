import { Button, FormControlLabel, Grid, TextField } from "@mui/material";
import React from "react";
import useOfficeResourceForm from "../../../../hooks/resource/officeResource/OfficeResourceForm/useOfficeResourceForm";
import { ThemeSwitch } from "../../../../../theme/ThemeSwitch";
import { toast } from "react-toastify";

const OfficeResourceFields = ({ onClose, isLoading, data }) => {
  const { formik } = useOfficeResourceForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      onClose();
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };
  const submitButtonText = data ? "Update " : "Add ";

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
            label="Resource Name"
            placeholder="Enter resource name"
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="uniqueNumber"
            name="uniqueNumber"
            label=" Unique Number"
            placeholder="Enter unique number of resource"
            fullWidth
            required
            value={formik.values.uniqueNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.uniqueNumber && Boolean(formik.errors.uniqueNumber)
            }
            helperText={
              formik.touched.uniqueNumber && formik.errors.uniqueNumber
            }
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label=" Description"
            placeholder="Enter description of resource"
            fullWidth
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <ThemeSwitch
                  checked={formik.values.isActive}
                  onChange={formik.handleChange}
                  name="isActive"
                />
              }
              label="If you want to deactive the office Logistics set switch to false"
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
            onClose={onClose}
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

export default OfficeResourceFields;
