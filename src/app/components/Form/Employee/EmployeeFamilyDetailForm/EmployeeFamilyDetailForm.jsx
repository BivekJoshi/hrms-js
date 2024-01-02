import { Grid, TextField, Divider } from "@mui/material";
import React from "react";
import { FieldArray, FormikProvider } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { useDeleteFamily } from "../../../../hooks/employee/useFamily";
import DeleteIcon from "../../../../../assets/DeleteIcon.png";

const EmployeeFamilyDetailForm = ({ formik, isLoading }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  const deleteFamilyMutation = useDeleteFamily({});
  const handleDeleteFamily = (familyMember) => {
    if (familyMember?.id) {
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
                      <Grid item xs={12} sm={3.6}>
                        <TextField
                          id={`family[${index}].name`}
                          name={`family[${index}].name`}
                          label="Name"
                          placeholder="Enter Name"
                          fullWidth
                          // required
                          value={familyMember.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.family?.[index]?.name &&
                              errors.family?.[index]?.name
                          )}
                          helperText={
                            touched.family?.[index]?.name &&
                            errors.family?.[index]?.name
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3.6}>
                        <TextField
                          id={`family[${index}].relation`}
                          relation={`family[${index}].relation`}
                          label="Relation"
                          placeholder="Enter Relation"
                          fullWidth
                          // required
                          value={familyMember.relation}
                          onChange={handleChange}
                          onBlur={handleBlur} // Add onBlur to update touched state
                          error={Boolean(
                            touched.family?.[index]?.relation &&
                              errors.family?.[index]?.relation
                          )}
                          helperText={
                            touched.family?.[index]?.relation &&
                            errors.family?.[index]?.relation
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3.6}>
                        <TextField
                          id={`family[${index}].mobileNumber`}
                          name={`family[${index}].mobileNumber`}
                          label="Mobile Number"
                          placeholder="Enter Mobile Number"
                          fullWidth
                          // type="number"
                          // required
                          value={familyMember.mobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur} // Add onBlur to update touched state
                          error={Boolean(
                            touched.family?.[index]?.mobileNumber &&
                              errors.family?.[index]?.mobileNumber
                          )}
                          helperText={
                            touched.family?.[index]?.mobileNumber &&
                            errors.family?.[index]?.mobileNumber
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={1}>
                        <div style={{ display: "flex", gap: ".5rem" }}>
                          <div
                            onClick={() =>
                              arrayHelpers.push({
                                name: "",
                                relation: "",
                                mobileNumber: "",
                              })
                            }
                            style={{
                              cursor:
                                index !== values.family.length - 1
                                  ? "not-allowed"
                                  : "pointer",
                              color:
                                index !== values.family.length - 1
                                  ? "#BDBDBD"
                                  : "#388E3C",
                              pointerEvents:
                                index !== values.family.length - 1
                                  ? "none"
                                  : "auto",
                            }}
                            disabled={index !== values.family.length - 1}
                          >
                            <AddIcon />
                          </div>
                          {values.family.length > 1 && (
                            <>
                              <div
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  handleDeleteFamily(familyMember);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <img src={DeleteIcon} alt="icon" />
                              </div>
                            </>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
                <br />
              </>
            )}
          />
        </FormikProvider>
      </div>
    )
  );
};

export default EmployeeFamilyDetailForm;
