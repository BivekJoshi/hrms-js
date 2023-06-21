import { Grid, TextField, Button, Typography } from '@mui/material';
import React from 'react';
import { FieldArray, FormikProvider } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const EmployeeFamilyDetailForm = ({ formik, isLoading }) => {

  return (
    !isLoading && (
      <div>
        <FormikProvider value={formik}>
          <FieldArray
            name="family"
            render={(arrayHelpers) => (
              <>
                {formik.values.family.map((familyMember, index) => (
                  <>
                    <br />
                    <Typography variant="button" display="block" gutterBottom>
                      Add Family Detail
                    </Typography>
                    <br />
                    <Grid container spacing={3} key={index}>
                      <Grid item xs={12} sm={4}>
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
                          autoFocus
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
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
                          autoFocus
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      <Grid
                        item xs={12}
                        sm={4}
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Button variant='contained'
                          disabled={formik.values.education?.length === 1}
                          onClick={() => arrayHelpers.remove(index)}
                          color='error'
                        >
                          <CloseIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ))}
                <br />
                <Button
                  variant='contained'
                  onClick={() => arrayHelpers.push({ name: "", relation: "" })}
                >
                  <AddIcon />
                </Button>
              </>
            )}
          />
        </FormikProvider>
      </div>
    )
  );
};

export default EmployeeFamilyDetailForm;
