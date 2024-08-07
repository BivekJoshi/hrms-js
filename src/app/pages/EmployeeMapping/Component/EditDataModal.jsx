import { Autocomplete, Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useContext } from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useEmployeeMappingForm } from "../../../hooks/EmployeeMapping/useEmployeeMappingForm";
import { useGetCompany } from "../../../hooks/company/useCompany";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const EditDataModal = ({ open, handleCloseModal, data }) => {
  const { formik } = useEmployeeMappingForm(data, handleCloseModal);

  const { mode } = useContext(ThemeModeContext);
  const { data: companyData, isLoading } = useGetCompany();

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <Box>
      <FormModal
        title={"Edit Employee Mapping"}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {/* <TextField
                id="deviceBranchId"
                name="deviceBranchId"
                label="Device Branch Id"
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
                InputLabelProps={{ shrink: Boolean(formik.values.deviceBranchId) }}
                size="small"
              /> */}
              <TextField
                id='deviceBranchId'
                name='deviceBranchId'
                select
                label='Branch Name'
                fullWidth
                required
                onBlur={formik.handleBlur}
                value={formik.values.deviceBranchId}
                onChange={formik.handleChange}
                error={formik.touched.deviceBranchId && Boolean(formik.errors.deviceBranchId)}
                helperText={formik.touched.deviceBranchId && formik.errors.deviceBranchId}
                variant='outlined'
                InputLabelProps={{ shrink: Boolean(formik.values.deviceBranchId) }}
                size='small'
              >
                {!isLoading &&
                  companyData.map((option) => (
                    <MenuItem
                      key={option?.id}
                      value={option?.id}
                      sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
                    >
                      {option?.branchName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="deviceEmpId"
                name="deviceEmpId"
                label="Device Employee Id"
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
                InputLabelProps={{ shrink: Boolean(formik.values.deviceEmpId) }}
                size="small"
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
                sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
                onClose={handleCloseModal}
              >
                Update Mapping
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
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
