import {
  Grid,
  TextField,
  Divider,
  MenuItem,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import { FieldArray, FormikProvider } from "formik";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDeleteQualification } from "../../../../hooks/employee/useQualification";
import DeleteIcon from "../../../../../assets/DeleteIcon.png";

const passedLevel = [
  {
    id: 1,
    label: "SLC / SEE",
  },
  {
    id: 2,
    label: "HSEB / NEB",
  },
  {
    id: 3,
    label: "Undergraduate",
  },
  {
    id: 4,
    label: "Post Graduate",
  },
  {
    id: 5,
    label: "Graduate",
  },
];

const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
); // Change 100 to adjust the range of available years

const EmployeeQualificationDetailForm = ({ formik, isLoading }) => {
  const { values, handleChange } = formik;

  const deleteQualificationMutation = useDeleteQualification({});
  const handleDeleteQualification = (study) => {
    if (study.id) {
      deleteQualificationMutation?.mutate(study.id);
    }
  };

  const getOptions = (index) => {
    const filter = passedLevel.filter(
      (item) =>
        !formik.values.education.some(
          (edu, i) => i !== index && edu.passedLevel === item.label
        )
    );
    return filter;
  };
  return (
    !isLoading && (
      <FormikProvider value={formik}>
        <FieldArray
          name="education"
          render={(arrayHelpers) => (
            <>
              {formik.values.education.map((study, index) => {
                return (
                  <>
                    <br />
                    <Divider>Add Education</Divider>
                    <br />
                    <Grid container spacing={3} key={index}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id={`education[${index}].passedLevel`}
                          name={`education[${index}].passedLevel`}
                          label="Passed Level"
                          placeholder="Enter your passed level"
                          fullWidth
                          select
                          value={study.passedLevel}
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik.touched.education?.[index]?.passedLevel &&
                              formik.errors.education?.[index]?.passedLevel
                          )}
                          helperText={
                            formik.touched.education?.[index]?.passedLevel &&
                            formik.errors.education?.[index]?.passedLevel
                          }
                          variant="outlined"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        >
                          {getOptions(index)?.map((option) => (
                            <MenuItem key={option?.id} value={option?.label}>
                              {option?.label}
                            </MenuItem>
                          ))}
                          {/* <option value='' disabled>
                            Select Level
                          </option>
                          {getOptions(index)?.map((option) => (
                            <option key={option?.id} value={option?.label}>
                              {`${option?.label}`}
                            </option>
                          ))} */}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id={`education[${index}].board`}
                          name={`education[${index}].board`}
                          label="Education Board"
                          placeholder="Enter your education board"
                          fullWidth
                          value={study.board}
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik.touched.education?.[index]?.board &&
                              formik.errors.education?.[index]?.board
                          )}
                          helperText={
                            formik.touched.education?.[index]?.board &&
                            formik.errors.education?.[index]?.board
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id={`education[${index}].institute`}
                          name={`education[${index}].institute`}
                          label="Institute"
                          placeholder="Enter your institute"
                          fullWidth
                          value={study.institute}
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik.touched.education?.[index]?.institute &&
                              formik.errors.education?.[index]?.institute
                          )}
                          helperText={
                            formik.touched.education?.[index]?.institute &&
                            formik.errors.education?.[index]?.institute
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          options={years}
                          onChange={(e, newValue) => {
                            formik.setFieldValue(
                              `education[${index}].passedYear`,
                              newValue
                            );
                          }}
                          value={study?.passedYear}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                id={`education[${index}].passedYear`}
                                name={`education[${index}].passedYear`}
                                label="Passed Year (A.D.)"
                                placeholder="Select your passed year"
                                fullWidth
                                error={Boolean(
                                  formik.touched.education?.[index]
                                    ?.passedYear &&
                                    formik.errors.education?.[index]?.passedYear
                                )}
                                helperText={
                                  formik.touched.education?.[index]
                                    ?.passedYear &&
                                  formik.errors.education?.[index]?.passedYear
                                }
                                variant="outlined"
                                size="small"
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id={`education[${index}].grade`}
                          name={`education[${index}].grade`}
                          label="Grade / Percentage(%)"
                          placeholder="Enter grade/percentage(%)"
                          fullWidth
                          value={study.grade}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.education?.[index]?.grade &&
                              formik.errors.education?.[index]?.grade
                          )}
                          helperText={
                            formik.touched.education?.[index]?.grade &&
                            formik.errors.education?.[index]?.grade
                          }
                          variant="outlined"
                          onBlur={formik.handleBlur}
                          size="small"
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={4}
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap=".5rem"
                      >
                        <div
                          onClick={() =>
                            arrayHelpers.push({
                              board: "",
                              institute: "",
                              passedLevel: "",
                              passedYear: "",
                              grade: "",
                            })
                          }
                          style={{
                            cursor:
                              index !== values.education.length - 1 ||
                              index >= passedLevel?.length - 1
                                ? "not-allowed"
                                : "pointer",
                            color:
                              index !== values.education.length - 1 ||
                              index >= passedLevel?.length - 1
                                ? "#BDBDBD"
                                : "#388E3C",
                            pointerEvents:
                              index !== values.education.length - 1 ||
                              index >= passedLevel?.length - 1
                                ? "none"
                                : "auto",
                          }}
                        >
                          <Tooltip title="Add education detail">
                            <AddIcon />
                          </Tooltip>
                        </div>
                        {values.education.length > 1 && (
                          <div
                            onClick={() => {
                              arrayHelpers.remove(index);
                              handleDeleteQualification(study);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Tooltip title="Delete education detail">
                              <img src={DeleteIcon} alt="icon" />
                            </Tooltip>
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </>
                );
              })}
              <br />
            </>
          )}
        />
      </FormikProvider>
    )
  );
};

export default EmployeeQualificationDetailForm;
