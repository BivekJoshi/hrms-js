import React from "react";
import { Grid, TextField, Button, Autocomplete } from "@mui/material";
import useAddPromotionHistoryForm from "../../../hooks/promotionHistory/addPromotionHistory.jsx/useAddPromotionForm";
import { useGetDesignation } from "../../../hooks/designation/useDesignation";

const AddPromotionHistoryFields = ({ onClose, isLoading }) => {
  const { data: designationData, isLoading: optionLoad } = useGetDesignation();
  const { formik } = useAddPromotionHistoryForm();

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();

    if (isValid) {
      formik.handleSubmit();

      if (formik.isValid) {
        formik.setTouched({
          positionId: false,
          effectiveFromDate: false,
          remarks: false,
        });
        onClose();
      }
    }
  };
  console.log(formik);
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <Autocomplete
            id="positionId"
            name="positionId"
            options={designationData}
            getOptionLabel={(option) =>
              `${option?.positionName} (${option?.positionLevel})` || ""
            }
            value={formik.values.positionId || null}
            onChange={(event, value) => {
              formik.setFieldValue("positionId", value ? value.id : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Position Name"
                fullWidth
                error={
                  formik.touched.positionId && Boolean(formik.errors.positionId)
                }
                helperText={
                  formik.touched.positionId && formik.errors.positionId
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
          /> */}
          <Autocomplete
            id="positionId"
            name="positionId"
            options={designationData || []}
            getOptionLabel={(option) => {
              return option
                ? `${option?.positionName || ""} ${option?.positionLevel || ""}`
                : "";
            }}
            value={formik.values.positionId}
            onChange={(event, value) => {
              formik.setFieldValue("positionId", value);
            }}
            onBlur={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Position Name"
                placeholder="Select position name"
                fullWidth
                error={
                  formik.touched.positionId && Boolean(formik.errors.positionId)
                }
                helperText={
                  formik.touched.positionId && formik.errors.positionId
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="effectiveFromDate"
            name="effectiveFromDate"
            label="Effective From Date"
            type="date"
            fullWidth
            value={formik.values.effectiveFromDate}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveFromDate &&
              Boolean(formik.errors.effectiveFromDate)
            }
            helperText={
              formik.touched.effectiveFromDate &&
              formik.errors.effectiveFromDate
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="remarks"
            name="remarks"
            label="Remarks"
            placeholder="Enter remarks type"
            fullWidth
            onBlur={formik.handleBlur}
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
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
            Promote Employee
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

export default AddPromotionHistoryFields;
