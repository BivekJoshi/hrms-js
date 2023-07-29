import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useAddOfficeResource } from "../../../../hooks/resource/officeResource/useOfficeResource";
import useOfficeResourceForm from "../../../../hooks/resource/officeResource/useOfficeResourceForm";

const OfficeResourceFields = ({ onClose, isLoading }) => {
  const { formik } = useOfficeResourceForm(onClose);

	const handleFormSubmit = () => {
		formik.handleSubmit();

		if (formik.isValid) {
			onClose();
		} else {
			toast.error('Please make sure you have filled the form correctly');
		}
	};
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="name"
            name="name"
            label=" Name"
            placeholder="Enter position name"
            fullWidth
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
            label=" uniqueNumber"
            placeholder="Enter position uniqueNumber"
            fullWidth
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
            label=" description"
            placeholder="Enter position description"
            fullWidth
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
            Add Department
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
