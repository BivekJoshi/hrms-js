import { Grid, TextField } from "@mui/material";
import React from "react";
import {
  useGetBank,
  useGetBankByEmployeeId,
} from "../../../../hooks/employee/useBank";

const EmployeeBankDetailForm = ({ formik }) => {
  const { data, isLoading } = useGetBankByEmployeeId();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="bankName"
          name="bankName"
          label="Bank Name"
          placeholder="Enter bank name"
          fullWidth
          value={formik.values.bankName}
          onChange={formik.handleChange}
          error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          helperText={formik.touched.bankName && formik.errors.bankName}
          variant="outlined"
          
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="bankAccountNumber"
          name="bankAccountNumber"
          label="Bank Account Number"
          placeholder="Enter bank account number"
          fullWidth
          value={formik.values.bankAccountNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.bankAccountNumber &&
            Boolean(formik.errors.bankAccountNumber)
          }
          helperText={
            formik.touched.bankAccountNumber && formik.errors.bankAccountNumber
          }
          variant="outlined"
          
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="bankAddress"
          name="bankAddress"
          label="Bank Address"
          placeholder="Enter bank address"
          fullWidth
          value={formik.values.bankAddress}
          onChange={formik.handleChange}
          error={
            formik.touched.bankAddress && Boolean(formik.errors.bankAddress)
          }
          helperText={formik.touched.bankAddress && formik.errors.bankAddress}
          variant="outlined"
          
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeBankDetailForm;
