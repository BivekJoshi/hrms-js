import { Grid, TextField, Button } from '@mui/material';
import { FieldArray, FormikProvider } from 'formik';
import React from 'react';

const EmployeeQualificationDetailForm = ({ formik, isLoading }) => {

  return (
    !isLoading && (
      <FormikProvider value={formik}>
        <FieldArray
          name="education"
          render={(arrayHelpers) => (
            <>
              {formik.values.education.map((study, index) => (
                <div key={index} style={{ display: "flex", gap: "1rem" }}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id={`education[${index}].board`}
                      name={`education[${index}].board`}
                      label="Education Board"
                      placeholder="Enter your educationn board"
                      fullWidth
                      value={formik.values.education[index].board}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.board && Boolean(formik.errors.education?.[index]?.board)}
                      helperText={formik.touched.education?.[index]?.board && formik.errors.education?.[index]?.board}
                      variant="outlined"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id={`education[${index}].institute`}
                      name={`education[${index}].institute`}
                      label="Institute"
                      placeholder="Enter your institute"
                      fullWidth
                      value={formik.values.education[index].institute}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.institute && Boolean(formik.errors.education?.[index]?.institute)}
                      helperText={formik.touched.education?.[index]?.institute && formik.errors.education?.[index]?.institute}
                      variant="outlined"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id={`education[${index}].passedLevel`}
                      name={`education[${index}].passedLevel`}
                      label="Passed Level"
                      placeholder="Enter your passed level"
                      fullWidth
                      value={formik.values.education[index].passedLevel}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.passedLevel && Boolean(formik.errors.education?.[index]?.passedLevel)}
                      helperText={formik.touched.education?.[index]?.passedLevel && formik.errors.education?.[index]?.passedLevel}
                      variant="outlined"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id={`education[${index}].passedYear`}
                      name={`education[${index}].passedYear`}
                      label="Passed Year"
                      placeholder="Enter your passed year"
                      fullWidth
                      value={formik.values.education[index].passedYear}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.passedYear && Boolean(formik.errors.education?.[index]?.passedYear)}
                      helperText={formik.touched.education?.[index]?.passedYear && formik.errors.education?.[index]?.passedYear}
                      variant="outlined"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id={`education[${index}].grade`}
                      name={`education[${index}].grade`}
                      label="Grade"
                      placeholder="Enter your grade"
                      fullWidth
                      value={formik.values.education[index].grade}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.grade && Boolean(formik.errors.education?.[index]?.grade)}
                      helperText={formik.touched.education?.[index]?.grade && formik.errors.education?.[index]?.grade}
                      variant="outlined"
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Button variant='contained'
                    disabled={formik.values.education?.length === 1}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <br />
              <Button variant='contained'
                onClick={() => arrayHelpers.push({ board: "", institute: "", passedLevel: "", passedYear: "", grade: "" })}
              >
                Add
              </Button>
              <br />
            </>
          )}
        />
      </FormikProvider>
    )
  );
};

export default EmployeeQualificationDetailForm;
