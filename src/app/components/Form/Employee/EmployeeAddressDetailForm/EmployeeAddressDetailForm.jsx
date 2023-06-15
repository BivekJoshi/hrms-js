import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { FieldArray, FormikProvider } from 'formik';
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
  console.log(formik);
  return (
    <FormikProvider value={formik}>
      <FieldArray
        name='addresses'
        render={(arrayHelpers) => {
          <div>
            {formik.values.addresses.map((address, index) => (
              <div key={index} style={{ display: 'flex', gap: '1rem' }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`addresses[${index}].country`}
                    name={`addresses[${index}].country`}
                    label='Country'
                    placeholder='Enter your country'
                    fullWidth
                    value={formik.values.addresses[index].country}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addresses?.[index]?.country &&
                      Boolean(formik.errors.addresses?.[index]?.country)
                    }
                    helperText={
                      formik.touched.addresses?.[index]?.country &&
                      formik.errors.addresses?.[index]?.country
                    }
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`addresses[${index}].province`}
                    name={`addresses[${index}].province`}
                    label='Province'
                    select
                    placeholder='Enter your province'
                    fullWidth
                    value={formik.values.addresses[index].province}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addresses?.[index]?.province &&
                      Boolean(formik.errors.addresses?.[index]?.province)
                    }
                    helperText={
                      formik.touched.addresses?.[index]?.province &&
                      formik.errors.addresses?.[index]?.province
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
                    id={`addresses[${index}].district`}
                    name={`addresses[${index}].district`}
                    label='District'
                    placeholder='Enter your district'
                    fullWidth
                    value={formik.values.addresses[index].district}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addresses?.[index]?.district &&
                      Boolean(formik.errors.addresses?.[index]?.district)
                    }
                    helperText={
                      formik.touched.addresses?.[index]?.district &&
                      formik.errors.addresses?.[index]?.district
                    }
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`addresses[${index}].wardNumber`}
                    name={`addresses[${index}].wardNumber`}
                    label='Ward Number'
                    placeholder='Enter your ward number'
                    fullWidth
                    value={formik.values.addresses[index].wardNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addresses?.[index]?.wardNumber &&
                      Boolean(formik.errors.addresses?.[index]?.wardNumber)
                    }
                    helperText={
                      formik.touched.addresses?.[index]?.wardNumber &&
                      formik.errors.addresses?.[index]?.wardNumber
                    }
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`addresses[${index}].city`}
                    name={`addresses[${index}].city`}
                    label='City'
                    placeholder='Enter your city'
                    fullWidth
                    value={formik.values.addresses[index].city}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addresses?.[index]?.city &&
                      Boolean(formik.errors.addresses?.[index]?.city)
                    }
                    helperText={
                      formik.touched.addresses?.[index]?.city &&
                      formik.errors.addresses?.[index]?.city
                    }
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`addresses[${index}].street`}
                    name={`addresses[${index}].street`}
                    label='Street'
                    placeholder='Enter your street'
                    fullWidth
                    value={formik.values.addresses[index].street}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addresses?.[index]?.street &&
                      Boolean(formik.errors.addresses?.[index]?.street)
                    }
                    helperText={
                      formik.touched.addresses?.[index]?.street &&
                      formik.errors.addresses?.[index]?.street
                    }
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        id={`addresses[${index}].temporaryAndPermanentAddressSame`}
                        name={`addresses[${index}].temporaryAndPermanentAddressSame`}
                        checked={
                          formik.values.addresses[index]
                            .temporaryAndPermanentAddressSame
                        }
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
                      formik.touched.addresses?.[index]
                        ?.temporaryAndPermanentAddressSame &&
                      Boolean(
                        formik.errors.addresses?.[index]
                          ?.temporaryAndPermanentAddressSame
                      )
                    }
                    helperText={
                      formik.touched.addresses?.[index]
                        ?.temporaryAndPermanentAddressSame &&
                      formik.errors.addresses?.[index]
                        ?.temporaryAndPermanentAddressSame
                    }
                  />
                </Grid>
                <Button
                  disabled={formik.values.addresses?.length === 1}
                  type='button'
                  onClick={() => arrayHelpers.remove(index)}
                  className='deleteButton'
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type='button'
              onClick={() =>
                arrayHelpers.push({
                  district: '',
                  wardNumber: '',
                  city: '',
                  street: '',
                  province: '',
                  country: '',
                })
              }
            >
              Add
            </Button>
          </div>;
        }}
      />
    </FormikProvider>
  );
};

export default EmployeeAddressDetailForm;
