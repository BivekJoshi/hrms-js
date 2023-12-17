import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { FieldArray, FormikProvider } from 'formik';
import React from 'react';
import { useDeleteHistory } from '../../../../hooks/employee/useEmployeeHistory';

const EmployeeHistoryDetailForm = ({ formik, isLoading }) => {
  const { values, handleChange } = formik;

  const deleteHistoryMutation = useDeleteHistory({});
  const handleDeleteHistory = (history) => {
    if (history.id) {
      deleteHistoryMutation.mutate(history.id);
    }
  };

  return (
    !isLoading && (
      <div>
        <FormikProvider value={formik}>
          <FieldArray
            name='history'
            render={(arrayHelpers) => (
              <>
                {formik.values.history.map((employeeHistory, index) => (
                  <React.Fragment key={index}>
                    <br />
                    <Divider> Add Employee History</Divider>
                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].employerName`}
                          name={`history[${index}].employerName`}
                          label='Branch Name'
                          placeholder='Enter the branch name you worked last time'
                          fullWidth
                          value={employeeHistory.employerName}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.employerName &&
                              formik.errors.history?.[index]?.employerName
                          )}
                          helperText={
                            formik.touched.history?.[index]?.employerName &&
                            formik.errors.history?.[index]?.employerName
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].employerAddress`}
                          name={`history[${index}].employerAddress`}
                          label='Company Address'
                          placeholder='Enter the company address you worked last time'
                          fullWidth
                          value={employeeHistory.employerAddress}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.employerAddress &&
                              formik.errors.history?.[index]?.employerAddress
                          )}
                          helperText={
                            formik.touched.history?.[index]?.employerAddress &&
                            formik.errors.history?.[index]?.employerAddress
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].pastPosition`}
                          name={`history[${index}].pastPosition`}
                          label='Past Position'
                          placeholder='Enter your past position'
                          fullWidth
                          value={employeeHistory.pastPosition}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.pastPosition &&
                              formik.errors.history?.[index]?.pastPosition
                          )}
                          helperText={
                            formik.touched.history?.[index]?.pastPosition &&
                            formik.errors.history?.[index]?.pastPosition
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].fromDate`}
                          name={`history[${index}].fromDate`}
                          label='Join Date'
                          placeholder='Enter Your Join date'
                          fullWidth
                          type='date'
                          value={employeeHistory.fromDate}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.fromDate &&
                              formik.errors.history?.[index]?.fromDate
                          )}
                          helperText={
                            formik.touched.history?.[index]?.fromDate &&
                            formik.errors.history?.[index]?.fromDate
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].toDate`}
                          name={`history[${index}].toDate`}
                          label='To Date'
                          placeholder='Enter Date'
                          fullWidth
                          type='date'
                          value={employeeHistory.toDate}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.toDate &&
                              formik.errors.history?.[index]?.toDate
                          )}
                          helperText={
                            formik.touched.history?.[index]?.toDate &&
                            formik.errors.history?.[index]?.toDate
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].description`}
                          name={`history[${index}].description`}
                          label='Description'
                          placeholder='Say somthing about last caompany'
                          fullWidth
                          value={employeeHistory.description}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.description &&
                              formik.errors.history?.[index]?.description
                          )}
                          helperText={
                            formik.touched.history?.[index]?.description &&
                            formik.errors.history?.[index]?.description
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          id={`history[${index}].remarks`}
                          name={`history[${index}].remarks`}
                          label='Remarks'
                          placeholder='Remarks'
                          fullWidth
                          value={employeeHistory.remarks}
                          onChange={handleChange}
                          error={Boolean(
                            formik.touched.history?.[index]?.remarks &&
                              formik.errors.history?.[index]?.remarks
                          )}
                          helperText={
                            formik.touched.history?.[index]?.remarks &&
                            formik.errors.history?.[index]?.remarks
                          }
                          variant='outlined'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={1}
                        container
                        direction='row'
                        justifyContent='flex-end'
                        alignItems='center'
                      >
                        {values.history.length > 1 && (
                          <Button
                            variant='contained'
                            onClick={() => {
                              arrayHelpers.remove(index);
                              handleDeleteHistory(employeeHistory);
                            }}
                            color='error'
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
                  variant='contained'
                  onClick={() =>
                    arrayHelpers.push({
                      employerName: '',
                      employerAddress: '',
                      pastPosition: '',
                      fromDate: '',
                      toDate: '',
                      description: '',
                      remarks: '',
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

export default EmployeeHistoryDetailForm;
