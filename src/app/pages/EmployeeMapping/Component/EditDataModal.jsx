import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useEmployeeMappingForm } from "../../../hooks/EmployeeMapping/useEmployeeMappingForm";

const EditDataModal = ({ open, handleCloseModal, data }) => {
  const { formik } = useEmployeeMappingForm(data);
console.log(data);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <Box>
      <FormModal
        title={"Edit Data"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="deviceBranchId"
                name="deviceBranchId"
                label="Device Branch Id"
                placeholder="Enter resource name"
                type="number"
                fullWidth
                required
                value={formik.values.deviceBranchId}
                onChange={formik.handleChange}
                error={
                  formik.touched.deviceBranchId &&
                  Boolean(formik.errors.deviceBranchId)
                }
                helperText={
                  formik.touched.deviceBranchId && formik.errors.deviceBranchId
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="deviceEmpId"
                name="deviceEmpId"
                label="Device Employee Id"
                placeholder="Enter resource name"
                type="number"
                fullWidth
                required
                value={formik.values.deviceEmpId}
                onChange={formik.handleChange}
                error={
                  formik.touched.deviceEmpId &&
                  Boolean(formik.errors.deviceEmpId)
                }
                helperText={
                  formik.touched.deviceEmpId && formik.errors.deviceEmpId
                }
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
                onClose={handleCloseModal}
              >
                submit change
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        }
      />
    </Box>
  );
};

export default EditDataModal;
