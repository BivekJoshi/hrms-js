import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Field, FieldArray, FormikProvider } from 'formik';

const EmployeeFamilyDetailForm = ({ formik, isLoading }) => {

  return (
    !isLoading && (
      <div>
        <FormikProvider value={formik}>
          <FieldArray
            name="family"
            render={(arrayHelpers) => (
              <div>
                {formik.values.family.map((familyMember, index) => (
                  <div key={index} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id={`family[${index}].name`}
                        name={`family[${index}].name`}
                        label="Name"
                        placeholder="Enter name"
                        fullWidth
                        value={familyMember.name}
                        onChange={formik.handleChange}
                        error={formik.touched.family?.[index]?.name && Boolean(formik.errors.family?.[index]?.name)}
                        helperText={formik.touched.family?.[index]?.name && formik.errors.family?.[index]?.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id={`family[${index}].relation`}
                        name={`family[${index}].relation`}
                        label="Relation"
                        placeholder="Enter relation"
                        fullWidth
                        value={familyMember.relation}
                        onChange={formik.handleChange}
                        error={formik.touched.family?.[index]?.relation && Boolean(formik.errors.family?.[index]?.relation)}
                        helperText={formik.touched.family?.[index]?.relation && formik.errors.family?.[index]?.relation}
                        variant="outlined"
                      />
                    </Grid>
                    {index > 0 && (
                      <Button
                        variant="outlined"
                        onClick={() => arrayHelpers.remove(index)}
                        className="deleteButton"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => arrayHelpers.push({ name: "", relation: "" })}
                >
                  Add Family Member
                </Button>
              </div>
            )}
          />
        </FormikProvider>
      </div>
    )
  );
};

export default EmployeeFamilyDetailForm;
