import { Grid, TextField, MenuItem, Typography, Button } from '@mui/material';
import { FieldArray, FormikProvider } from 'formik';
import React, { useEffect, useState } from 'react';
import { ThemeSwitch } from '../../../../../theme/ThemeSwitch';

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

const EmployeeAddressDetailForm = ({ formik, isLoading, data }) => {
  console.log({"data": data})
  const [showTemporaryAddress, setShowTemporaryAddress] = useState(
    Boolean(data?.addresses?.[1]?.id)
  );

  useEffect(() => {
    setShowTemporaryAddress(data?.addresses?.[1]?.id);
  }, [data]);

  const handleTemporaryButtonClick = (index) => {
    setShowTemporaryAddress(!showTemporaryAddress);
  };

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
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            id={`addresses[${index}].country`}
                            name={`addresses[${index}].country`}
                            label='Country'
                            placeholder='Enter country'
                            fullWidth
                            select
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
                            InputLabelProps={{ shrink: true }}
                          >
                            <MenuItem key='Nepal' value='Nepal'>
                              Nepal
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
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
                            InputLabelProps={{ shrink: true }}
                          >
                            {province?.map((option) => (
                              <MenuItem key={option?.id} value={option?.value}>
                                {option?.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
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
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
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
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
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
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
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
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                      <Typography
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                      >
                        <ThemeSwitch
                          onClick={() => handleTemporaryButtonClick(index)}
                        />
                        Temporary Address is not same as permanent
                      </Typography>
                    </>
                  ) : (
                    <>
                      {showTemporaryAddress && (
                        <Grid container spacing={3} key={index}>
                          <Grid item xs={12} sm={6} md={4}>
                            <TextField
                              id={`addresses[${index}].country`}
                              name={`addresses[${index}].country`}
                              label='Country'
                              placeholder='Enter country'
                              fullWidth
                              select
                              value={address.country}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.addresses?.[index]?.country &&
                                Boolean(
                                  formik.errors.addresses?.[index]?.country
                                )
                              }
                              helperText={
                                formik.touched.addresses?.[index]?.country &&
                                formik.errors.addresses?.[index]?.country
                              }
                              variant='outlined'
                              InputLabelProps={{ shrink: true }}
                            >
                              <MenuItem key='Nepal' value='Nepal'>
                                Nepal
                              </MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
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
                              InputLabelProps={{ shrink: true }}
                            >
                              {province?.map((option) => (
                                <MenuItem
                                  key={option?.id}
                                  value={option?.value}
                                >
                                  {option?.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
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
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
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
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
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
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
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
                                Boolean(
                                  formik.errors.addresses?.[index]?.street
                                )
                              }
                              helperText={
                                formik.touched.addresses?.[index]?.street &&
                                formik.errors.addresses?.[index]?.street
                              }
                              variant='outlined'
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </Grid>
                      )}
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

// const province = [
//   {
//     value: "KOSHI",
//     label: "Koshi Pradesh",
//     id: 1,
//   },
//   {
//     value: "MADHESH",
//     label: "Madhesh Pradesh",
//     id: 2,
//   },
//   {
//     value: "BAGMATI",
//     label: "Bagmati Pradesh",
//     id: 3,
//   },
//   {
//     value: "GANDAKI",
//     label: "Gandaki Pradesh",
//     id: 4,
//   },
//   {
//     value: "LUMBINI",
//     label: "Lumbini Pradesh",
//     id: 5,
//   },
//   {
//     value: "KARNALI",
//     label: "Karnali Pradesh",
//     id: 6,
//   },
//   {
//     value: "SUDURPASHCHIM",
//     label: "Sudurpashchim Pradesh",
//     id: 7,
//   },
// ];

// import { Grid, TextField, MenuItem, Typography, Button } from "@mui/material";
// import { FieldArray, FormikProvider } from "formik";
// import React, { useEffect, useState } from "react";
// import { ThemeSwitch } from "../../../../../theme/ThemeSwitch";

// export const AddressField = ({ index, fieldName, label, placeholder, address, formik }) => {
// return (
//   <Grid item xs={12} sm={6} md={4}>
//     <TextField
//       id={`addresses[${index}].${fieldName}`}
//       name={`addresses[${index}].${fieldName}`}
//       label={label}
//       placeholder={`Enter ${placeholder.toLowerCase()}`}
//       fullWidth
//       select={fieldName === "country" || fieldName === "province"}
//       value={address[fieldName]}
//       onChange={formik.handleChange}
//       error={
//         formik.touched.addresses?.[index]?.[fieldName] &&
//         Boolean(formik.errors.addresses?.[index]?.[fieldName])
//       }
//       helperText={
//         formik.touched.addresses?.[index]?.[fieldName] &&
//         formik.errors.addresses?.[index]?.[fieldName]
//       }
//       variant="outlined"
//       
//       InputLabelProps={{ shrink: true }}
//     >
//       {fieldName === "country" && (
//           <MenuItem key="Nepal" value="Nepal">
//             Nepal
//           </MenuItem>
//         )}
//         {fieldName === "province" && (
//           province.map((prov) => (
//             <MenuItem key={prov.value} value={prov.value}>
//               {prov.label}
//             </MenuItem>
//           ))
//         )}
//     </TextField>
//   </Grid>
// )};

// const EmployeeAddressDetailForm = ({ data, formik, isLoading }) => {

//   const handleTemporaryButtonClick = (index) => {
//     const data = {...formik.values.addresses[index]}
//     formik.setFieldValue(`addresses[${index + 1}]`, data);
//   };

//   return (
//     !isLoading && (
//       <FormikProvider value={formik}>
//         <FieldArray
//           name="addresses"
//           render={(arrayHelpers) => (
//             <div>
//               {formik.values.addresses.map((address, index) => (
//                 <div key={index}>
//                       <Typography style={{ marginBottom: "20px" }}>
//                         {index === 0 ? "Permanent Address" : "Temporary Address"}
//                       </Typography>
//                       <Grid container spacing={3}>
//                       <AddressField
//                       index={index}
//                       fieldName="country"
//                       label="Country"
//                       placeholder="Country"
//                       address={address}
//                       formik={formik}
//                     />
//                      <AddressField
//                       index={index}
//                       fieldName="province"
//                       label="Province"
//                       placeholder="Province"
//                       address={address}
//                       formik={formik}
//                     />
//                      <AddressField
//                       index={index}
//                       fieldName="district"
//                       label="District"
//                       placeholder="district"
//                       address={address}
//                       formik={formik}
//                     />
//                      <AddressField
//                       index={index}
//                       fieldName="wardNumber"
//                       label="Ward Number"
//                       placeholder="wardNumber"
//                       address={address}
//                       formik={formik}
//                     />
//                      <AddressField
//                       index={index}
//                       fieldName="city"
//                       label="city"
//                       placeholder="city"
//                       address={address}
//                       formik={formik}
//                     />
//                      <AddressField
//                       index={index}
//                       fieldName="street"
//                       label="street"
//                       placeholder="street"
//                       address={address}
//                       formik={formik}
//                     />

//                       </Grid>
//                       { index === 0 && (
//                         <Typography
//                         style={{ marginTop: "20px", marginBottom: "20px" }}
//                       >
//                         <ThemeSwitch
//                           onClick={() => handleTemporaryButtonClick(index)}
//                         />
//                         Temporary address is same as permanent
//                       </Typography>
//                       )}
//                 </div>
//               ))}
//             </div>
//           )}
//         />
//       </FormikProvider>
//     )
//   );
// };

// export default EmployeeAddressDetailForm;
