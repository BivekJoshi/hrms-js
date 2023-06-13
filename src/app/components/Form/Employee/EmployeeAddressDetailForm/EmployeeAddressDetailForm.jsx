import {
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const province = [
  {
    value: 'KOSHI',
    label: 'Koshi Pradesh',
  },
  {
    value: 'MADHESH',
    label: 'Madhesh Pradesh',
  },
  {
    value: 'BAGMATI',
    label: 'Bagmati Pradesh',
  },
  {
    value: 'GANDAKI',
    label: 'Gandaki Pradesh',
  },
  {
    value: 'LUMBINI',
    label: 'Lumbini Pradesh',
  },
  {
    value: 'KARNALI',
    label: 'Karnali Pradesh',
  },
  {
    value: 'SUDURPASHCHIM',
    label: 'Sudurpashchim Pradesh',
  },
];

const EmployeeAddressDetailForm = ({ formik, temporaryFormik }) => {
  console.log(formik.values);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography>Permanent Address</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='country'
          name='country'
          label='Country'
          placeholder='Enter your country'
          fullWidth
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='province'
          name='province'
          label='Province'
          select
          placeholder='Enter your province'
          fullWidth
          value={formik.values.province}
          onChange={formik.handleChange}
          error={formik.touched.province && Boolean(formik.errors.province)}
          helperText={formik.touched.province && formik.errors.province}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        >
          {province.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='district'
          name='district'
          label='District'
          placeholder='Enter your district'
          fullWidth
          value={formik.values.district}
          onChange={formik.handleChange}
          error={formik.touched.district && Boolean(formik.errors.district)}
          helperText={formik.touched.district && formik.errors.district}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='wardNumber'
          name='wardNumber'
          label='Ward Number'
          placeholder='Enter your ward number'
          fullWidth
          value={formik.values.wardNumber}
          onChange={formik.handleChange}
          error={formik.touched.wardNumber && Boolean(formik.errors.wardNumber)}
          helperText={formik.touched.wardNumber && formik.errors.wardNumber}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='city'
          name='city'
          label='City'
          placeholder='Enter your city'
          fullWidth
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id='street'
          name='street'
          label='Street'
          placeholder='Enter your street'
          fullWidth
          value={formik.values.street}
          onChange={formik.handleChange}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
          variant='outlined'
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControlLabel
          control={
            <Switch
              id='temporaryAndPermanentAddressSame'
              name='temporaryAndPermanentAddressSame'
              checked={formik.values.temporaryAndPermanentAddressSame}
              onChange={(e) => {
                formik.setFieldValue(
                  'temporaryAndPermanentAddressSame',
                  e.target.checked
                );
              }}
            />
          }
          label='Do you have different permanent and temporary address?'
          error={
            formik.touched.temporaryAndPermanentAddressSame &&
            Boolean(formik.errors.temporaryAndPermanentAddressSame)
          }
          helperText={
            formik.touched.temporaryAndPermanentAddressSame &&
            formik.errors.temporaryAndPermanentAddressSame
          }
        />
      </Grid>
      {formik.values.temporaryAndPermanentAddressSame && (
        <>
          <Grid item xs={12} sm={12}>
            <Typography>Temporary Address</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='country'
              name='country'
              label='Country'
              placeholder='Enter your country'
              fullWidth
              value={temporaryFormik.values.country}
              onChange={temporaryFormik.handleChange}
              error={
                temporaryFormik.touched.country &&
                Boolean(temporaryFormik.errors.country)
              }
              helperText={
                temporaryFormik.touched.country &&
                temporaryFormik.errors.country
              }
              variant='outlined'
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='province'
              name='province'
              label='Province'
              select
              placeholder='Enter your province'
              fullWidth
              value={temporaryFormik.values.province}
              onChange={temporaryFormik.handleChange}
              error={
                temporaryFormik.touched.province &&
                Boolean(temporaryFormik.errors.province)
              }
              helperText={
                temporaryFormik.touched.province &&
                temporaryFormik.errors.province
              }
              variant='outlined'
              autoFocus
              InputLabelProps={{ shrink: true }}
            >
              {province.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='district'
              name='district'
              label='District'
              placeholder='Enter your district'
              fullWidth
              value={temporaryFormik.values.district}
              onChange={temporaryFormik.handleChange}
              error={
                temporaryFormik.touched.district &&
                Boolean(temporaryFormik.errors.district)
              }
              helperText={
                temporaryFormik.touched.district &&
                temporaryFormik.errors.district
              }
              variant='outlined'
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='wardNumber'
              name='wardNumber'
              label='Ward Number'
              placeholder='Enter your ward number'
              fullWidth
              value={temporaryFormik.values.wardNumber}
              onChange={temporaryFormik.handleChange}
              error={
                temporaryFormik.touched.wardNumber &&
                Boolean(temporaryFormik.errors.wardNumber)
              }
              helperText={
                temporaryFormik.touched.wardNumber &&
                temporaryFormik.errors.wardNumber
              }
              variant='outlined'
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='city'
              name='city'
              label='City'
              placeholder='Enter your city'
              fullWidth
              value={temporaryFormik.values.city}
              onChange={temporaryFormik.handleChange}
              error={
                temporaryFormik.touched.city &&
                Boolean(temporaryFormik.errors.city)
              }
              helperText={
                temporaryFormik.touched.city && temporaryFormik.errors.city
              }
              variant='outlined'
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='street'
              name='street'
              label='Street'
              placeholder='Enter your street'
              fullWidth
              value={temporaryFormik.values.street}
              onChange={temporaryFormik.handleChange}
              error={
                temporaryFormik.touched.street &&
                Boolean(temporaryFormik.errors.street)
              }
              helperText={
                temporaryFormik.touched.street && temporaryFormik.errors.street
              }
              variant='outlined'
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default EmployeeAddressDetailForm;
