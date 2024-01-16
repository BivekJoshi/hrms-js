import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useGetDepartment } from "../../../../../hooks/department/useDepartment";
import { useGetCompany } from "../../../../../hooks/company/useCompany";
import useTransferEmployment from "../../../../../hooks/employee/useTransferEmployment";
import { useGetDesignation } from "../../../../../hooks/designation/useDesignation";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import { ThemeSwitch } from "../../../../../../theme/ThemeSwitch";

const EmployeeUpDown = ({ data, handleSuccess }) => {
  const { data: departmentData, isLoading: loadingDepartment } =
    useGetDepartment();
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();
  const { data: designationData, isLoading: loadingDesignation } =
    useGetDesignation();
  const { mode } = useContext(ThemeModeContext);
  const { formik } = useTransferEmployment(data, handleSuccess);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Box marginTop={3} padding={4}>
      <Grid container spacing={3}>
        <Grid sm={12}>
          <Typography variant="h6" marginLeft={3}>
            Change Position
          </Typography>
        </Grid>
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              id="fromPosition"
              name="fromPosition"
              select
              label="From Position"
              fullWidth
              disabled
              required
              value={!loadingCompany && formik.values.fromPosition}
              onChange={formik.handleChange}
              error={
                formik.touched.fromPosition &&
                Boolean(formik.errors.fromPosition)
              }
              helperText={
                formik.touched.fromPosition && formik.errors.fromPosition
              }
              variant="outlined"
            >
              {!loadingDesignation &&
                designationData?.map((option) => (
                  <MenuItem
                    key={option?.id}
                    value={option?.id}
                    sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                  >
                    {option?.positionName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="positionId"
              name="positionId"
              select
              label="Position Name"
              fullWidth
              required
              value={!loadingCompany && formik.values.positionId}
              onChange={formik.handleChange}
              error={
                formik.touched.positionId && Boolean(formik.errors.positionId)
              }
              helperText={formik.touched.positionId && formik.errors.positionId}
              variant="outlined"
            >
              {!loadingDesignation &&
                designationData?.map((option) => (
                  <MenuItem
                    key={option?.id}
                    value={option?.id}
                    sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                  >
                    {option?.positionName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </>

        <Grid item sm={12}>
          <FormLabel component="legend">
            Do you want to transfer employee as well?
          </FormLabel>
          <FormControlLabel
            required
            control={
              <ThemeSwitch
                checked={formik.values.transferEmployee}
                onChange={formik.handleChange}
                name="transferEmployee"
              />
            }
            label="Transfer Employee"
          />
        </Grid>
        {formik.values?.transferEmployee && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                id="fromDepartment"
                name="fromDepartment"
                select
                label="From Department"
                // placeholder='Select your department'
                fullWidth
                disabled
                required
                value={!loadingDepartment && formik.values.fromDepartment}
                onChange={formik.handleChange}
                error={
                  formik.touched.fromDepartment &&
                  Boolean(formik.errors.fromDepartment)
                }
                helperText={
                  formik.touched.fromDepartment && formik.errors.fromDepartment
                }
                variant="outlined"
              >
                {!loadingDepartment &&
                  departmentData?.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                      sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                    >
                      {option.departmentName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="departmentId"
                name="departmentId"
                select
                label="To Department"
                // placeholder='Select your department'
                fullWidth
                required
                value={!loadingDepartment && formik.values.departmentId}
                onChange={formik.handleChange}
                error={
                  formik.touched.departmentId &&
                  Boolean(formik.errors.departmentId)
                }
                helperText={
                  formik.touched.departmentId && formik.errors.departmentId
                }
                variant="outlined"
              >
                {!loadingDepartment &&
                  departmentData?.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                      sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                    >
                      {option.departmentName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="fromBranch"
                name="fromBranch"
                select
                label="From Branch"
                // placeholder='Select your branch'
                fullWidth
                required
                disabled
                value={!loadingCompany && formik.values.fromBranch}
                onChange={formik.handleChange}
                error={
                  formik.touched.fromBranch && Boolean(formik.errors.fromBranch)
                }
                helperText={
                  formik.touched.fromBranch && formik.errors.fromBranch
                }
                variant="outlined"
              >
                {!loadingCompany &&
                  companyData?.map((option) => (
                    <MenuItem
                      key={option?.id}
                      value={option?.id}
                      sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                    >
                      {option?.branchName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="branchId"
                name="branchId"
                select
                label="To Branch"
                // placeholder='Select your branch'
                fullWidth
                required
                value={!loadingCompany && formik.values.branchId}
                onChange={formik.handleChange}
                error={
                  formik.touched.branchId && Boolean(formik.errors.branchId)
                }
                helperText={formik.touched.branchId && formik.errors.branchId}
                variant="outlined"
              >
                {!loadingCompany &&
                  companyData?.map((option) => (
                    <MenuItem
                      key={option?.id}
                      value={option?.id}
                      sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
                    >
                      {option?.branchName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            id="effectiveDateFrom"
            name="effectiveDateFrom"
            label="Effective From Date"
            type="date"
            fullWidth
            value={formik.values.effectiveDateFrom}
            onChange={formik.handleChange}
            error={
              formik.touched.effectiveDateFrom &&
              Boolean(formik.errors.effectiveDateFrom)
            }
            helperText={
              formik.touched.effectiveDateFrom &&
              formik.errors.effectiveDateFrom
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={12}>
          <TextField
            id="remarks"
            name="remarks"
            label="Remarks"
            placeholder="Enter work remarks"
            fullWidth
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            multiline
            minRows={3}
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
            Change Position
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeUpDown;
