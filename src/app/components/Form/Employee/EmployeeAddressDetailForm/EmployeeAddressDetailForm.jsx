import {
  Grid,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import { FieldArray, FormikProvider } from 'formik';
import React from 'react';

const province = [
  {
    value: 'KOSHI',
    label: 'Koshi Pradesh',
    id: 1,
  },
  {
    value: 'MADHESH',
    label: 'Madhesh Pradesh',
    id: 2,
  },
  {
    value: 'BAGMATI',
    label: 'Bagmati Pradesh',
    id: 3,
  },
  {
    value: 'GANDAKI',
    label: 'Gandaki Pradesh',
    id: 4,
  },
  {
    value: 'LUMBINI',
    label: 'Lumbini Pradesh',
    id: 5,
  },
  {
    value: 'KARNALI',
    label: 'Karnali Pradesh',
    id: 6,
  },
  {
    value: 'SUDURPASHCHIM',
    label: 'Sudurpashchim Pradesh',
    id: 7,
  },
];

const EmployeeAddressDetailForm = ({ formik, isLoading }) => {
  return (
    !isLoading && (
      <FormikProvider value={formik}>
        <FieldArray
          name='addresses'
          render={(arrayHelpers) => (
            <div>
              {formik.values.addresses.map((address, index) => (
                <>
                  {index === 0 ? (
                    <>
                      <Typography style={{ marginBottom: '20px' }}>
                        Permanent Address
                      </Typography>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            id={`addresses[${index}].country`}
                            name={`addresses[${index}].country`}
                            label='Country'
                            placeholder='Enter country'
                            fullWidth
                            value={address.country}
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
                            select
                            label='Province'
                            placeholder='Enter province'
                            fullWidth
                            value={address.province}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.addresses?.[index]?.province &&
                              Boolean(
                                formik.errors.addresses?.[index]?.province
                              )
                            }
                            helperText={
                              formik.touched.addresses?.[index]?.province &&
                              formik.errors.addresses?.[index]?.province
                            }
                            variant='outlined'
                            autoFocus
                            InputLabelProps={{ shrink: true }}
                          >
                            {province?.map((option) => (
                              <MenuItem key={option?.id} value={option?.value}>
                                {option?.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            id={`addresses[${index}].district`}
                            name={`addresses[${index}].district`}
                            label='District'
                            placeholder='Enter district'
                            fullWidth
                            value={address.district}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.addresses?.[index]?.district &&
                              Boolean(
                                formik.errors.addresses?.[index]?.district
                              )
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
                            placeholder='Enter ward number'
                            fullWidth
                            value={address.wardNumber}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.addresses?.[index]?.wardNumber &&
                              Boolean(
                                formik.errors.addresses?.[index]?.wardNumber
                              )
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
                            placeholder='Enter city'
                            fullWidth
                            value={address.city}
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
                            placeholder='Enter street'
                            fullWidth
                            value={address.street}
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
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Typography
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                      >
                        Temporary Address
                      </Typography>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            id={`addresses[${index}].country`}
                            name={`addresses[${index}].country`}
                            label='Country'
                            placeholder='Enter country'
                            fullWidth
                            value={address.country}
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
                            select
                            label='Province'
                            placeholder='Enter province'
                            fullWidth
                            value={address.province}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.addresses?.[index]?.province &&
                              Boolean(
                                formik.errors.addresses?.[index]?.province
                              )
                            }
                            helperText={
                              formik.touched.addresses?.[index]?.province &&
                              formik.errors.addresses?.[index]?.province
                            }
                            variant='outlined'
                            autoFocus
                            InputLabelProps={{ shrink: true }}
                          >
                            {province?.map((option) => (
                              <MenuItem key={option?.id} value={option?.value}>
                                {option?.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            id={`addresses[${index}].district`}
                            name={`addresses[${index}].district`}
                            label='District'
                            placeholder='Enter district'
                            fullWidth
                            value={address.district}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.addresses?.[index]?.district &&
                              Boolean(
                                formik.errors.addresses?.[index]?.district
                              )
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
                            placeholder='Enter ward number'
                            fullWidth
                            value={address.wardNumber}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.addresses?.[index]?.wardNumber &&
                              Boolean(
                                formik.errors.addresses?.[index]?.wardNumber
                              )
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
                            placeholder='Enter city'
                            fullWidth
                            value={address.city}
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
                            placeholder='Enter street'
                            fullWidth
                            value={address.street}
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
                      </Grid>
                    </>
                  )}
                </>
              ))}
            </div>
          )}
        />
      </FormikProvider>
    )
  );
};

export default EmployeeAddressDetailForm;
