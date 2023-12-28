import React from "react";
import { Grid, TextField, Button, Autocomplete } from "@mui/material";
import useAddEmployeeHistoryForm from '../../../hooks/employeehistory/useAddEmployeeHistoryForm';

const AddEmployeeHistoryFields = ( {onClose, isLoading }) => {
  const { formik } = useAddEmployeeHistoryForm();

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {

        // formik.setTouched({
        //   positionId: false,
        //   effectiveFromDate: false,
        //   remarks: false,
        // });
        // onClose();
    }
  };

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="pastPosition"
            name="pastPosition"
            label="Last Position"
            fullWidth
            value={formik.values.pastPosition}
            onChange={formik.handleChange}
            error={
              formik.touched.pastPosition &&
              Boolean(formik.errors.pastPosition)
            }
            helperText={
              formik.touched.pastPosition &&
              formik.errors.pastPosition
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="fromDate"
            name="fromDate"
            label="From Date"
            type="date"
            fullWidth
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            error={
              formik.touched.fromDate &&
              Boolean(formik.errors.fromDate)
            }
            helperText={
              formik.touched.fromDate &&
              formik.errors.fromDate
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="toDate"
            name="toDate"
            label="To Date"
            type="date"
            fullWidth
            value={formik.values.toDate}
            onChange={formik.handleChange}
            error={
              formik.touched.toDate &&
              Boolean(formik.errors.toDate)
            }
            helperText={
              formik.touched.toDate &&
              formik.errors.toDate
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Enter work description"
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="remarks"
            name="remarks"
            label="remarks"
            placeholder="Enter work remarks"
            fullWidth
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="employerAddress"
            name="employerAddress"
            label="employerAddress"
            placeholder="Enter work employerAddress"
            fullWidth
            value={formik.values.employerAddress}
            onChange={formik.handleChange}
            error={formik.touched.employerAddress && Boolean(formik.errors.employerAddress)}
            helperText={formik.touched.employerAddress && formik.errors.employerAddress}
            variant="outlined"
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
            Add
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

export default AddEmployeeHistoryFields;
