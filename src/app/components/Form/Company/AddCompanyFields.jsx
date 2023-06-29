import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import useAddCompanyForm from "../../../hooks/company/addCompany/useAddCompanyForm";

const AddCompanyFields = ({ onClose, isLoading }) => {
  const { formik } = useAddCompanyForm();

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm(); // Validate the form

    if (isValid) {
      formik.handleSubmit(); // Submit the form

      if (formik.isValid) {
        formik.setTouched({
          companyName: false,
          companyType: false,
          companyDescription: false,
        });
        onClose(); // Close the modal
      } else {
        toast.error("Please make sure you have filled the form correctly");
      }
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="companyName"
            name="companyName"
            label="Company Name"
            placeholder="Enter company name"
            fullWidth
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="companyType"
            name="companyType"
            label="Company Type"
            placeholder="Enter company type"
            fullWidth
            value={formik.values.companyType}
            onChange={formik.handleChange}
            error={
              formik.touched.companyType && Boolean(formik.errors.companyType)
            }
            helperText={formik.touched.companyType && formik.errors.companyType}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="companyDescription"
            name="companyDescription"
            label="Description"
            placeholder="Enter your Company Description"
            fullWidth
            value={formik.values.companyDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.companyDescription &&
              Boolean(formik.errors.companyDescription)
            }
            helperText={
              formik.touched.companyDescription &&
              formik.errors.companyDescription
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
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Add Company
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default AddCompanyFields;
