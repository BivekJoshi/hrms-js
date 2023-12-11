import { Grid, TextField, Button, Typography, Divider } from "@mui/material";
import React from "react";
import { FieldArray, FormikProvider } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDeleteFamily } from "../../../../hooks/employee/useFamily";

const EmployeeFamilyDetailForm = ({ formik, isLoading }) => {
  const { values, handleChange } = formik;

  const deleteFamilyMutation = useDeleteFamily({});
  const handleDeleteFamily = (familyMember) => {
    if (familyMember.id) {
      deleteFamilyMutation.mutate(familyMember.id);
    }
  };

  return (
    !isLoading && (
      <div>
        <FormikProvider value={formik}>
          <FieldArray
            name="family"
            render={(arrayHelpers) => (
              <>
                {formik.values.family.map((familyMember, index) => (
                  <React.Fragment key={index}>
                    <br />
                    <Divider>Add Family Detail</Divider>
                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id={`family[${index}].name`}
                          name={`family[${index}].name`}
                          label="Name"
                          placeholder="Enter name"
                          fullWidth
                          required
                          value={familyMember.name}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.family?.[index]?.name &&
                              formik.errors.family?.[index]?.name
                          )}
                          helperText={
                            formik.touched.family?.[index]?.name &&
                            formik.errors.family?.[index]?.name
                          }
                          variant="outlined"
                          autoFocus
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id={`family[${index}].relation`}
                          name={`family[${index}].relation`}
                          label="Relation"
                          placeholder="Enter relation"
                          fullWidth
                          value={familyMember.relation}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.family?.[index]?.relation &&
                              formik.errors.family?.[index]?.relation
                          )}
                          helperText={
                            formik.touched.family?.[index]?.relation &&
                            formik.errors.family?.[index]?.relation
                          }
                          variant="outlined"
                          autoFocus
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id={`family[${index}].mobileNumber`}
                          name={`family[${index}].mobileNumber`}
                          label="Mobile Number"
                          placeholder="Enter mobile number"
                          fullWidth
                          value={familyMember.mobileNumber}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.family?.[index]?.mobileNumber &&
                              formik.errors.family?.[index]?.mobileNumber
                          )}
                          helperText={
                            formik.touched.family?.[index]?.mobileNumber &&
                            formik.errors.family?.[index]?.mobileNumber
                          }
                          variant="outlined"
                          autoFocus
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={1}
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        {values.family.length > 1 && (
                          <Button
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.remove(index);
                              handleDeleteFamily(familyMember);
                            }}
                            color="error"
                          >
                            Delete
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
                <br />
                <Button
                  variant="contained"
                  onClick={() =>
                    arrayHelpers.push({
                      name: "",
                      relation: "",
                      mobileNumber: "",
                    })
                  }
                >
                  Add
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
