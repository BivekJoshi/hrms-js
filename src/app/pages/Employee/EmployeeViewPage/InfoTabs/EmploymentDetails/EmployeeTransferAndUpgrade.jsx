import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import useEmployeeTransferUpgrade from "../../../../../hooks/employee/useEmployeeTransferUpgrade";
import { useGetDepartment } from "../../../../../hooks/department/useDepartment";
import { useGetDesignation } from "../../../../../hooks/designation/useDesignation";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import { useGetCompany } from "../../../../../hooks/company/useCompany";

const EmployeeTransferAndUpgrade = ({ handleSuccess, backCallBack }) => {
  const { data: departmentData, isLoading: loadingDepartment } =
    useGetDepartment();
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();
  const { data: designationData, isLoading: loadingDesignation } =
    useGetDesignation();
  const { mode } = useContext(ThemeModeContext);
  const { formik } = useEmployeeTransferUpgrade(handleSuccess);

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const isAllposition = formik?.values?.allPosition;
  return (
    <Box sx={{ px: 1, mt: 2 }}>
      <Grid container spacing={3}>
        <Grid sm={12}>
          <Typography variant="h6" marginLeft={3}>
            Transfer or Up/Downgrade Employee
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={`${formik?.values?.allPosition}`}
              name="allPosition"
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Transfer all position to new Branch/Department"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Up/Downgrade to New Position"
              />
            </RadioGroup>
          </FormControl>
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
            error={formik.touched.branchId && Boolean(formik.errors.branchId)}
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
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
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
        {isAllposition === "false" && (
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
            required
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
            sx={{ mt: 3, ml: 1 }}
            onClick={backCallBack}
            color="success"
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={handleSubmit}
          >
            {isAllposition === "false"
              ? "Change Position"
              : "Transfer Employee"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeTransferAndUpgrade;
