import { Grid, MenuItem, TextField } from "@mui/material";
import React, { useContext } from "react";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";
import "./Style.css";
import RemarkField from "../../../RemarkField/RemarkField";

const genderOptions = [
  {
    value: "MALE",
    label: "Male",
    id: 1,
  },
  {
    value: "FEMALE",
    label: "Female",
    id: 2,
  },
  {
    value: "OTHER",
    label: "Others",
    id: 3,
  },
];
const maritalStatus = [
  {
    value: "MARRIED",
    label: "Married",
  },
  {
    value: "UNMARRIED",
    label: "Unmarried",
  },
];

const currentDate = new Date();
const minAge = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate()
)
  .toISOString()
  .split("T")[0];

const EmployeeBasicInfoForm = ({ formik, data }) => {
  const { mode } = useContext(ThemeModeContext);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          fullWidth
          required
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          variant="outlined"
          autoFocus
          InputLabelProps={{ shrink: Boolean(formik.values.firstName) }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="middleName"
          name="middleName"
          label="Middle Name"
          fullWidth
          value={formik.values.middleName}
          onChange={formik.handleChange}
          error={formik.touched.middleName && Boolean(formik.errors.middleName)}
          helperText={formik.touched.middleName && formik.errors.middleName}
          variant="outlined"
          InputLabelProps={{
            shrink: Boolean(formik.values.middleName),
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          fullWidth
          required
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          variant="outlined"
          InputLabelProps={{
            shrink: Boolean(formik.values.lastName),
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="gender"
          name="gender"
          select
          label="Gender"
          fullWidth
          required
          value={formik.values.gender}
          onChange={formik.handleChange}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          variant="outlined"
          onBlur={formik.handleBlur}
          size="small"
        >
          {genderOptions?.map((option) => (
            <MenuItem
              key={option?.id}
              value={option?.value}
              sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
            >
              {option?.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          error={
            formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
          }
          inputProps={{ max: minAge }}
          helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="mobileNumber"
          name="mobileNumber"
          label="Mobile Number"
          fullWidth
          required
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
          }
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
          variant="outlined"
          InputLabelProps={{
            shrink: Boolean(formik.values.mobileNumber),
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="CitizenshipNumber"
          name="citizenshipNumber"
          label="Citizenship Number"
          fullWidth
          required
          value={formik.values.citizenshipNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.citizenshipNumber &&
            Boolean(formik.errors.citizenshipNumber)
          }
          helperText={
            formik.touched.citizenshipNumber && formik.errors.citizenshipNumber
          }
          variant="outlined"
          InputLabelProps={{
            shrink: Boolean(formik.values.citizenshipNumber),
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="panNumber"
          name="panNumber"
          label="PAN Number"
          fullWidth
          value={formik.values.panNumber}
          onChange={formik.handleChange}
          error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
          helperText={formik.touched.panNumber && formik.errors.panNumber}
          variant="outlined"
          InputLabelProps={{
            shrink: Boolean(formik.values.panNumber),
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="maritalStatus"
          name="maritalStatus"
          select
          label="Marital Status"
          fullWidth
          required
          value={formik.values.maritalStatus}
          onChange={formik.handleChange}
          error={
            formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)
          }
          helperText={
            formik.touched.maritalStatus && formik.errors.maritalStatus
          }
          variant="outlined"
          size="small"
        >
          {maritalStatus?.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          id="officeEmail"
          name="officeEmail"
          label="Office Email"
          fullWidth
          required
          multiline
          rows={2}
          value={formik.values.officeEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.officeEmail && Boolean(formik.errors.officeEmail)
          }
          helperText={formik.touched.officeEmail && formik.errors.officeEmail}
          variant="outlined"
          InputLabelProps={{
            shrink: Boolean(formik.values.officeEmail),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <RemarkField
          id="remarks"
          name="remarks"
          label="Remarks"
          fullWidth
          formik={formik}
          maxLength={255}
          variant="outlined"
          multiline
          InputLabelProps={{
            shrink: Boolean(formik.values.remarks),
          }}
          rows={2}
          inputProps={{ maxLength: 255 }}
          data={data?.remarks}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeBasicInfoForm;
