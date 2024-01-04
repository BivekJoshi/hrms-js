import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Autocomplete,
} from "@mui/material";
import { FieldArray, FormikProvider } from "formik";
import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "../../../../../theme/ThemeSwitch";
import { usePermanentAddressForm } from "../../../../hooks/employee/AddAddress/useAddressForm";
import useGetDistrictAndMunicipality from "./useGetDistrictAndMunicipality";

const EmployeeAddressDetailForm = ({ formik, isLoading, data }) => {
  const [showTemporaryAddress, setShowTemporaryAddress] = useState(false);
  const {
    province,
    tempDistrictOptions,
    permanentDistrictsOptions,
    permanentMunicipalityOptions,
    tempMunicipalityOptions,
  } = useGetDistrictAndMunicipality(formik.values);

  useEffect(() => {
    const isperTempAddressTrue = formik.values?.perTempAddSame;
    setShowTemporaryAddress(isperTempAddressTrue);
  }, [formik.values]);

  const handleTemporaryButtonClick = () => {
    setShowTemporaryAddress((val) => !val);
    formik.setFieldValue("perTempAddSame", !formik.values.perTempAddSame);
  };

  return (
    !isLoading && (
      <FormikProvider value={formik}>
        <FieldArray
          name="addresses"
          render={(arrayHelpers) => (
            <div>
              {formik?.values?.addresses?.map((address, index) => (
                <>
                  {index === 0 ? (
                    <>
                      <Typography style={{ marginBottom: "20px" }}>
                        Permanent Address
                      </Typography>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            id={`addresses[${index}].country`}
                            name={`addresses[${index}].country`}
                            label="Country"
                            placeholder="Enter country"
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
                            variant="outlined"
                            size="small"
                          >
                            <MenuItem key="Nepal" value="Nepal">
                              Nepal
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            id={`addresses[${index}].province`}
                            name={`addresses[${index}].province`}
                            select
                            label="Province"
                            placeholder="Enter province"
                            fullWidth
                            value={address.province}
                            onChange={(event) => {
                              formik.handleChange(event);
                              formik.setFieldValue(`addresses[${index}].district`,"");
                              formik.setFieldValue(`addresses[${index}].municipality`,"");
                            }}
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
                            variant="outlined"
                            size="small"
                          >
                            {province?.map((option) => (
                              <MenuItem key={option?.id} value={option?.value}>
                                {option?.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Autocomplete
                            options={permanentDistrictsOptions || []}
                            getOptionLabel={(option) => option?.name}
                            value={
                              permanentDistrictsOptions?.find(
                                (d) => d?.name === address?.district
                              ) || null
                            }
                            getOptionKey={(option) => option.name}
                            onChange={(event, newValue) => {
                              formik.handleChange(event);
                              formik.setFieldValue(
                                `addresses[${index}].district`,
                                newValue?.name || ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                id={`addresses[${index}].district`}
                                name={`addresses[${index}].district`}
                                label="District"
                                placeholder="Enter district"
                                value={address?.district}
                                fullWidth
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
                                variant="outlined"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Autocomplete
                            options={permanentMunicipalityOptions || []}
                            getOptionLabel={(option) => option.name}
                            value={
                              permanentMunicipalityOptions?.find(
                                (d) => d.name === address?.municipality
                              ) || null
                            }
                            getOptionKey={(option) => option.name}
                            onChange={(event, newValue) => {
                              formik.handleChange(event);
                              formik.setFieldValue(
                                `addresses[${index}].municipality`,
                                newValue?.name || ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                id={`addresses[${index}].municipality`}
                                name={`addresses[${index}].municipality`}
                                label="Municipality"
                                placeholder="Enter municipality"
                                value={address?.municipality}
                                fullWidth
                                error={
                                  formik.touched.addresses?.[index]
                                    ?.municipality &&
                                  Boolean(
                                    formik.errors.addresses?.[index]
                                      ?.municipality
                                  )
                                }
                                helperText={
                                  formik.touched.addresses?.[index]
                                    ?.municipality &&
                                  formik.errors.addresses?.[index]?.municipality
                                }
                                variant="outlined"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            id={`addresses[${index}].wardNumber`}
                            name={`addresses[${index}].wardNumber`}
                            label="Ward Number"
                            placeholder="Enter ward number"
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
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            id={`addresses[${index}].city`}
                            name={`addresses[${index}].city`}
                            label="City"
                            placeholder="Enter city"
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
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            id={`addresses[${index}].street`}
                            name={`addresses[${index}].street`}
                            label="Street"
                            placeholder="Enter street"
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
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Typography
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <ThemeSwitch
                          name="perTempAddSame"
                          checked={showTemporaryAddress}
                          onClick={() => handleTemporaryButtonClick(index)}
                        />
                        Do you have different Temporary Address?
                      </Typography>
                    </>
                  ) : (
                    <>
                      {showTemporaryAddress && (
                        <Grid container spacing={3} key={index}>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              id={`addresses[${index}].country`}
                              name={`addresses[${index}].country`}
                              label="Country"
                              placeholder="Enter country"
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
                              variant="outlined"
                              size="small"
                            >
                              <MenuItem key="Nepal" value="Nepal">
                                Nepal
                              </MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              id={`addresses[${index}].province`}
                              name={`addresses[${index}].province`}
                              select
                              label="Province"
                              placeholder="Enter province"
                              fullWidth
                              value={address.province}
                              onChange={(event) => {
                                formik.handleChange(event);
                                formik.setFieldValue(`addresses[${index}].district`,"");
                                formik.setFieldValue(`addresses[${index}].municipality`,"");
                              }}
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
                              variant="outlined"
                              size="small"
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
                          <Grid item xs={12} sm={6} md={3}>
                            <Autocomplete
                              options={tempDistrictOptions || []}
                              getOptionLabel={(option) => option.name}
                              value={
                                tempDistrictOptions?.find(
                                  (d) => d.name === address?.district
                                ) || null
                              }
                              getOptionKey={(option) => option.name}
                              onChange={(event, newValue) => {
                                formik.handleChange(event);
                                formik.setFieldValue(
                                  `addresses[${index}].district`,
                                  newValue?.name || ""
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  id={`addresses[${index}].district`}
                                  name={`addresses[${index}].district`}
                                  label="District"
                                  placeholder="Enter district"
                                  value={address?.district}
                                  fullWidth
                                  error={
                                    formik.touched.addresses?.[index]
                                      ?.district &&
                                    Boolean(
                                      formik.errors.addresses?.[index]?.district
                                    )
                                  }
                                  helperText={
                                    formik.touched.addresses?.[index]
                                      ?.district &&
                                    formik.errors.addresses?.[index]?.district
                                  }
                                  variant="outlined"
                                  size="small"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Autocomplete
                              options={tempMunicipalityOptions || []}
                              getOptionLabel={(option) => option.name}
                              value={
                                tempMunicipalityOptions?.find(
                                  (d) => d.name === address?.municipality
                                ) || null
                              }
                              getOptionKey={(option) => option.name}
                              onChange={(event, newValue) => {
                                formik.handleChange(event);
                                formik.setFieldValue(
                                  `addresses[${index}].municipality`,
                                  newValue?.name || ""
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  id={`addresses[${index}].municipality`}
                                  name={`addresses[${index}].municipality`}
                                  label="Municipality"
                                  placeholder="Enter municipality"
                                  value={address?.municipality}
                                  fullWidth
                                  error={
                                    formik.touched.addresses?.[index]
                                      ?.municipality &&
                                    Boolean(
                                      formik.errors.addresses?.[index]
                                        ?.municipality
                                    )
                                  }
                                  helperText={
                                    formik.touched.addresses?.[index]
                                      ?.municipality &&
                                    formik.errors.addresses?.[index]
                                      ?.municipality
                                  }
                                  variant="outlined"
                                  size="small"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              id={`addresses[${index}].wardNumber`}
                              name={`addresses[${index}].wardNumber`}
                              label="Ward Number"
                              placeholder="Enter ward number"
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
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              id={`addresses[${index}].city`}
                              name={`addresses[${index}].city`}
                              label="City"
                              placeholder="Enter city"
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
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              id={`addresses[${index}].street`}
                              name={`addresses[${index}].street`}
                              label="Street"
                              placeholder="Enter street"
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
                              variant="outlined"
                              size="small"
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
