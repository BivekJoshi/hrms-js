import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Field, FieldArray, FormikProvider } from 'formik';

const EmployeeFamilyDetailForm = ({ formik, isLoading }) => {
  const handleAddField = () => {
    formik.setFieldValue('family', [...formik.values.family, { name: '', relation: '' }]);
  };

  return (
    // !isLoading && (
    //   <Grid container spacing={3}>
    //     <Grid item xs={12} sm={4}>
    //       <TextField
    //         id="name"
    //         name="name"
    //         label="Name"
    //         placeholder="Enter your name"
    //         fullWidth
    //         value={formik.values.family[0].name}
    //         onChange={formik.handleChange}
    //         error={formik.touched.family?.[0]?.name && Boolean(formik.errors.family?.[0]?.name)}
    //         helperText={formik.touched.family?.[0]?.name && formik.errors.family?.[0]?.name}
    //         variant="outlined"
    //         autoFocus
    //         InputLabelProps={{ shrink: true }}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={4}>
    //       <TextField
    //         id="relation"
    //         name="relation"
    //         label="Relation"
    //         placeholder="Enter your relation"
    //         fullWidth
    //         value={formik.values.family[0].relation}
    //         onChange={formik.handleChange}
    //         error={formik.touched.family?.[0]?.relation && Boolean(formik.errors.family?.[0]?.relation)}
    //         helperText={formik.touched.family?.[0]?.relation && formik.errors.family?.[0]?.relation}
    //         variant="outlined"
    //         autoFocus
    //         InputLabelProps={{ shrink: true }}
    //       />
    //     </Grid>
    //     <FieldArray name="family">
    //       {(fieldArrayProps) => {
    //         const { push, remove, form } = fieldArrayProps;
    //         console.log(fieldArrayProps)
    //         // const { values } = form;
    //         // const { family } = values;

    //         return (
    //           // <Grid item xs={12} sm={4}>
    //           //   {/* {family.map((_, index) => (
    //           //     <div key={index}>
    //           //       <Field name={`family[${index}].name`} as={TextField} label="Name" />
    //           //       <Field name={`family[${index}].relation`} as={TextField} label="Relation" />

    //           //       <Button onClick={() => remove(index)}>Delete</Button>
    //           //     </div>
    //           //   ))} */}

    //           //   <Button onClick={() => handleAddField()}>Add</Button>
    //           // </Grid>
    //           <div>Field Array</div>
    //         );
    //       }}
    //     </FieldArray>
    //   </Grid>
    // )
    <FormikProvider value={formik}>
      <FieldArray
        name="family"
        render={(arrayHelpers) => (
          <div>
            {formik.values.family.map((friend, index) => (
              <div key={index} style={{ display: "flex", gap: "1rem" }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id={`family[${index}].name`}
                    name={`family[${index}].name`}
                    label="Name"
                    placeholder="Enter your name"
                    fullWidth
                    value={formik.values.family[index].name}
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
                    placeholder="Enter your Relation"
                    fullWidth
                    value={formik.values.family[index].relation}
                    onChange={formik.handleChange}
                    error={formik.touched.family?.[index]?.relation && Boolean(formik.errors.family?.[index]?.relation)}
                    helperText={formik.touched.family?.[index]?.relation && formik.errors.family?.[index]?.relation}
                    variant="outlined"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <button
                  disabled={formik.values.family?.length === 1}
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                  className="deleteButton"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => arrayHelpers.push({ name: "", relation: "" })}
            >
              Add
            </button>
          </div>
        )}
      />
    </FormikProvider>
  );
};

export default EmployeeFamilyDetailForm;
