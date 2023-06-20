import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useGetCompany } from '../../../../hooks/company/useCompany';
import { useGetDesignation } from '../../../../hooks/designation/useDesignation';
import { useGetDepartment } from '../../../../hooks/department/useDepartment';

const genderOptions = [
  {
    value: 'MALE',
    label: 'Male',
    id: 1,
  },
  {
    value: 'FEMALE',
    label: 'Female',
    id: 2,
  },
  {
    value: 'OTHERS',
    label: 'Others',
    id: 3,
  },
];
const maritalStatus = [
  {
    value: 'MARRIED',
    label: 'Married',
  },
  {
    value: 'UNMARRIED',
    label: 'Unmarried',
  },
];

const EmployeeBasicInfoForm = ({ formik, isLoading }) => {
  const { data: companyData, isLoading: loadingCompany } = useGetCompany();
  const { data: designationData, isLoading: loadingDesignation } =
    useGetDesignation();
  const { data: departmentData, isLoading: loadingDepartment } =
    useGetDepartment();
  const handleChange = (event) => {
    formik.setFieldValue('gender', event.target.value);
  };
  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            id='firstName'
            name='firstName'
            label='First Name'
            placeholder='Enter your first name'
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
            placeholder='Enter your middle name'
            fullWidth
            value={formik.values.middleName}
            onChange={formik.handleChange}
            error={
              formik.touched.middleName && Boolean(formik.errors.middleName)
            }
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
            placeholder='Enter your last name'
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
            id='gender'
            name='gender'
            select
            label='Gender'
            placeholder='Select your gender'
            fullWidth
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            variant='outlined'
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
          >
            {genderOptions?.map((option) => (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name='dateOfBirth'
            label='Date of Birth'
            type='date'
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.dateOfBirth}
            onChange={handleChange}
            error={
              formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
            }
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name='dateOfJoin'
            label='Date of Join'
            type='date'
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.dateOfJoin}
            onChange={formik.handleChange}
            error={
              formik.touched.dateOfJoin && Boolean(formik.errors.dateOfJoin)
            }
            helperText={formik.touched.dateOfJoin && formik.errors.dateOfJoin}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='mobileNumber'
            name='mobileNumber'
            label='Mobile Number'
            placeholder='Enter your mobile number'
            fullWidth
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='CitizenshipNumber'
            name='citizenshipNumber'
            label='Citizenship Number'
            placeholder='Enter citizenship number'
            fullWidth
            value={formik.values.citizenshipNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.citizenshipNumber &&
              Boolean(formik.errors.citizenshipNumber)
            }
            helperText={
              formik.touched.citizenshipNumber &&
              formik.errors.citizenshipNumber
            }
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='panNumber'
            name='panNumber'
            label='PAN Number'
            placeholder='Enter PAN number'
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
            label='Office Email'
            placeholder='Enter office email'
            fullWidth
            value={formik.values.officeEmail}
            onChange={formik.handleChange}
            error={
              formik.touched.officeEmail && Boolean(formik.errors.officeEmail)
            }
            helperText={formik.touched.officeEmail && formik.errors.officeEmail}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='maritalStatus'
            name='maritalStatus'
            select
            label='Marital Status'
            placeholder='Select marital status'
            fullWidth
            value={formik.values.maritalStatus}
            onChange={formik.handleChange}
            error={
              formik.touched.maritalStatus &&
              Boolean(formik.errors.maritalStatus)
            }
            helperText={
              formik.touched.maritalStatus && formik.errors.maritalStatus
            }
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
        <Grid item xs={12} sm={4}>
          <TextField
            id='companyId'
            name='companyId'
            select
            label='Company Name'
            placeholder='Select your company'
            fullWidth
            value={!loadingCompany && formik.values.companyId}
            onChange={formik.handleChange}
            error={formik.touched.companyId && Boolean(formik.errors.companyId)}
            helperText={formik.touched.companyId && formik.errors.companyId}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingCompany &&
              companyData.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.companyName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='positionId'
            name='positionId'
            select
            label='Designation'
            placeholder='Select your designation'
            fullWidth
            value={!loadingDesignation && formik.values.positionId}
            onChange={formik.handleChange}
            error={
              formik.touched.positionId && Boolean(formik.errors.positionId)
            }
            helperText={formik.touched.positionId && formik.errors.positionId}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingDesignation &&
              designationData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.positionName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='departmentId'
            name='departmentId'
            select
            label='Department Name'
            placeholder='Select your department'
            fullWidth
            value={!loadingDepartment && formik.values.departmentId}
            onChange={formik.handleChange}
            error={
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
            }
            helperText={
              formik.touched.departmentId && formik.errors.departmentId
            }
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {!loadingDepartment &&
              departmentData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.departmentName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>
    )
  );
};

export default EmployeeBasicInfoForm;
