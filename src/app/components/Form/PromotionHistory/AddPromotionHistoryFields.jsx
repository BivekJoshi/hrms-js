import React from "react";
import { Grid, TextField, Button, Autocomplete } from "@mui/material";
import useAddPromotionHistoryForm from "../../../hooks/promotionHistory/addPromotionHistory.jsx/useAddPromotionForm";
import { useGetDesignation } from "../../../hooks/designation/useDesignation";
import RemarkField from "../../RemarkField/RemarkField";

const AddPromotionHistoryFields = ({
  onClose,
  isLoading,
  PromotionHistory,
}) => {
  const { formik } = useAddPromotionHistoryForm(onClose);
  const { data: designationData, isLoading: optionLoad } = useGetDesignation();

  const handleFormSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid) {
    }
  };
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
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
                fullWidth
                required
                error={
                  formik.touched.positionId && Boolean(formik.errors.positionId)
                }
                helperText={
                  formik.touched.positionId && formik.errors.positionId
                }
                variant="outlined"
                size="small"
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
            required
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
            inputProps={{
              max: currentDate,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <TextField
            id='remarks'
            name='remarks'
            label='Remarks'
            fullWidth
            onBlur={formik.handleBlur}
            formik={formik}
            maxLength={255}
            variant='outlined'
            multiline
            rows={4}
            inputProps={{ maxLength: 250 }}
          /> */}
          <RemarkField
            id="remarks"
            name="remarks"
            label="Remarks"
            fullWidth
            formik={formik}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{ shrink: Boolean(formik.values.remarks) }}
            rows={4}
            inputProps={{ maxLength: 250 }}
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
            {PromotionHistory?.length !== 0
              ? " Change Position"
              : "Add Position"}
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
