import { Grid, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';

const gender = [
  {
    value: 'MALE',
    label: 'male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
  {
    value: 'OTHERS',
    label: 'Others',
  }
];
const maritalStatus = [
  {
    value: 'MARRIED',
    label: 'Married',
  },
  {
    value: 'UNMARRIED',
    label: 'Unmarried',
  }
];

const EmployeeBasicInfoForm = ({ formik }) => {
  // console.log("bivek", formik)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TextField
          id='firstName'
          name='firstName'
          label='First Name'
          placeholder='Enter your firstname'
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='middleName'
          name='middleName'
          label='Middle Name'
          fullWidth
          value={formik.values.middleName}
          onChange={formik.handleChange}
          error={formik.touched.middleName && Boolean(formik.errors.middleName)}
          helperText={formik.touched.middleName && formik.errors.middleName}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='lastName'
          name='lastName'
          label='Last Name'
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="gender"
          select
          label="Gender"
          fullWidth
          value={formik.values.gender}
          onChange={formik.handleChange}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
          <DatePicker
          id='dateOfBirth'
          name='dateOfBirth'
          label='dateOfBirth'
          fullWidth
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
          helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
          />
      </Grid>
      <Grid item xs={12} sm={4}>
          <DatePicker
          id='dateOfJoin'
          name='dateOfJoin'
          label='dateOfJoin'
          fullWidth
          value={formik.values.dateOfJoin}
          onChange={formik.handleChange}
          error={formik.touched.dateOfJoin && Boolean(formik.errors.dateOfJoin)}
          helperText={formik.touched.dateOfJoin && formik.errors.dateOfJoin}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
          />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='mobileNumber'
          name='mobileNumber'
          label='mobileNumber'
          fullWidth
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='CitizeshipNumber'
          name='citizenshipNumber'
          label='Citizenship Number'
          fullWidth
          value={formik.values.citizenshipNumber}
          onChange={formik.handleChange}
          error={formik.touched.citizenshipNumber && Boolean(formik.errors.citizenshipNumber)}
          helperText={formik.touched.citizenshipNumber && formik.errors.citizenshipNumber}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='panNumber'
          name='panNumber'
          label='panNumber'
          fullWidth
          value={formik.values.panNumber}
          onChange={formik.handleChange}
          error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
          helperText={formik.touched.panNumber && formik.errors.panNumber}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='officeEmail'
          name='officeEmail'
          label='officeEmail'
          fullWidth
          value={formik.values.officeEmail}
          onChange={formik.handleChange}
          error={formik.touched.officeEmail && Boolean(formik.errors.officeEmail)}
          helperText={formik.touched.officeEmail && formik.errors.officeEmail}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="maritalStatus"
          select
          label="maritalStatus"
          fullWidth
          value={formik.values.maritalStatus}
          onChange={formik.handleChange}
          error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
          helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
          {maritalStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

    </Grid>
  );
};

export default EmployeeBasicInfoForm;
